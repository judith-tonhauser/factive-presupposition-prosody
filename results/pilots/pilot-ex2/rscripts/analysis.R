setwd('/Users/elenavaiksnoraite/Documents/Github/factive-presupposition-prosody/results/pilots/pilot-ex2/rscripts')
require(tidyverse)
library(stringr)
library(magrittr)
library(ordinal)
library(dplyr)
library(janitor)
library(digest)
library(scales)
library(lme4)

## Load raw data
results <- read.csv("../data/exp2-pilot-anonymous-v2.csv", sep=",") 
nrow(results) 
head(results)
summary(results)

#### Check whether the participants left any comments
comments = results %>%
  filter(PennElementName == "participant_comments")
unique(comments$Value)

# load prosody data from the production experiment to merge additional annotation data 
prosody <- read.csv("../data/prosody-wide.csv")
prosody$PA_c_focus <- ifelse(prosody$PA_c == "L+H*" | prosody$PA_c == "H*", "(L+)H*", "other") 
prosody$PA_nc_focus <- ifelse(prosody$PA_nc == "L+H*" | prosody$PA_nc == "H*", "(L+)H*", "other") 
nrow(prosody) 
head(prosody)

# merge the two dfs and look only at rows containing the forced choice judgment
results %<>%
  left_join(prosody,by=c("utt", "talker"))  %>% 
  filter(results$PennElementName == "judgement")
head(results)
nrow(results)


############ DATA EXCLUSION: 

##### Identify the number of participants that did not perform on the controls as expected
control_performance = results %>%
  filter(Text_condition == "control1" | Text_condition == "control2") %>%
  group_by(workerId) %>%
  filter(Correct_answer != Value)
excluded_subjects = unique(control_performance$workerId) #the number of excluded subjects
proportion_excluded_subjects = round(length(excluded_subjects)*100 / length(unique(results$workerId[!(results$workerId=="NA")])),2) 
#the proportion of excluded subjects

##### Exclude participants 
df <- filter(results, ! workerId %in% excluded_subjects) 


# ad a column that tracks whether a participant picked the audio file we expected them to pick
# based on the text
df$Predicted_byCondition <- ifelse(df$Correct_answer == df$Value, "Expected",
                                                          "Unexpected")

############ Fillers
## Look at the average number of `correct` answers in fillers:
filler = df %>%
  filter(df$Text_condition == 'filler') 
summary(filler)

table(filler$utt, filler$Predicted_byCondition) #Raw numbers

tabyl(filler, utt, Predicted_byCondition)%>% #Percentages
  adorn_percentages("row") %>%
  adorn_pct_formatting(digits = 1)

#################### DATA VISUALIZATION
target = df %>%
  filter(df$Text_condition == 'c' | df$Text_condition == 'nc' )
summary(target)


############## Hypothesis 1: Correct responses per each text condition (c, nc)
tabyl(target, Text_condition, Predicted_byCondition)%>% #Percentages
  adorn_percentages("row") %>%
  adorn_pct_formatting(digits = 1)


############## Hypothesis 2: The influence of prosody on choice of utterance

#new column keeps track whether the chosen utterance was originally produced in committed or non-committed condition
target$Sound_chosen <- ifelse(target$Text_condition == "c" & target$Correct_answer == target$Value, "c",
                       ifelse(target$Text_condition == "nc" & target$Correct_answer != target$Value, "c",       
                                     "nc"))

########## The effect of PA on the last content word on utterance choice
target$PA_prominence <- ifelse(target$PA_c_focus == target$PA_nc_focus &  target$PA_c_focus == "other", "BothOtherPAs",
                        ifelse(target$PA_c_focus == target$PA_nc_focus &  target$PA_c_focus == "(L+)H*", "BothFocusPAs",
                        ifelse(target$PA_c_focus == "(L+)H*" & target$PA_nc_focus == "other", "PA_c",
                            "PA_nc")))

####### Based on the findings in Vaiksnoraite, de Marneffe and Tonhauser (2019), we expect that:
  #in the committed condition an utterance with a less prominent PA will be chosen
  #in the non-committed condition an utterance with a more prominent PA will be chosen
target$Prediction_byPA <- ifelse(target$Text_condition == "c" & target$PA_prominence == "PA_c", "Predict nc chosen",
                        ifelse(target$Text_condition == "c" & target$PA_prominence == "PA_nc", "Predict c chosen",
                        ifelse(target$Text_condition == "nc" & target$PA_prominence == "PA_c", "Predict c chosen",
                        ifelse(target$Text_condition == "nc" & target$PA_prominence == "PA_nc", "Predict nc chosen",
                          "no prediction"))))

###Non-committed condition
target_nc <- droplevels(subset(target, target$Text_condition == "nc"))

# Was the sound with a more prominent PA chosen?
tabyl(target_nc, PA_prominence, Sound_chosen)%>% #Percentages
  adorn_percentages("row") %>%
  adorn_pct_formatting(digits = 1)

tabyl(target_nc, Prediction_byPA, Sound_chosen)%>% #Percentages
  adorn_percentages("row") %>%
  adorn_pct_formatting(digits = 1)

###Committed condition
target_c <- droplevels(subset(target, target$Text_condition == "c"))

tabyl(target_c, PA_prominence, Sound_chosen)%>% #Percentages
  adorn_percentages("row") %>%
  adorn_pct_formatting(digits = 1)

tabyl(target_c, Prediction_byPA, Sound_chosen)%>% #Percentages
  adorn_percentages("row") %>%
  adorn_pct_formatting(digits = 1)


# Across both conditions how often were our predictions correct?
target$Prediction_byPA_correct <- ifelse(target$Text_condition == "c" & target$Prediction_byPA == "Predict c chosen" & target$Sound_chosen == "c", "correct",
                                  ifelse(target$Text_condition == "c" & target$Prediction_byPA == "Predict nc chosen" & target$Sound_chosen == "nc", "correct",
                                  ifelse(target$Text_condition == "nc" & target$Prediction_byPA == "Predict c chosen" & target$Sound_chosen == "c", "correct",
                                  ifelse(target$Text_condition == "nc" & target$Prediction_byPA == "Predict nc chosen" & target$Sound_chosen == "nc", "correct",
                                  ifelse(target$Prediction_byPA == "no prediction", "no prediction",
                                         "incorrect")))))
  
table(target$Prediction_byPA_correct, target$Text_condition) #Raw numbers
tabyl(target, Prediction_byPA_correct, Text_condition)%>% #Percentages
  adorn_percentages("col") %>%
  adorn_pct_formatting(digits = 1)

########## The effect of the duration of the last content word on utterance choice
####### Based on the findings in Vaiksnoraite, de Marneffe and Tonhauser (2019), we expect that:
#in the committed condition an utterance with a shorter LCW duration will be chosen.
#in the non-committed condition an utterance with a longer LCW duration will be chosen.

target$Dur_Dif <- target$Dur_nc - target$Dur_c
# Were predictions by Dur correct
target$Prediction_byDur <- ifelse(target$Text_condition == "c" & target$Dur_Dif > 0 & target$Sound_chosen == "c", "correct",
                                  ifelse(target$Text_condition == "c" & target$Dur_Dif <  0 & target$Sound_chosen == "nc", "correct",
                                  ifelse(target$Text_condition == "nc" & target$Dur_Dif < 0 & target$Sound_chosen == "c", "correct",
                                  ifelse(target$Text_condition == "nc" & target$Dur_Dif > 0 & target$Sound_chosen == "nc", "correct",
                                                                     "incorrect"))))


table(target$Prediction_byDur, target$Text_condition) #Raw numbers
tabyl(target, Prediction_byDur, Text_condition)%>% #Percentages
  adorn_percentages("col") %>%
  adorn_pct_formatting(digits = 1)


########## The effect of the overall F0 of the uttarance on utterance choice
####### Based on the findings in Vaiksnoraite, de Marneffe and Tonhauser (2019), we expect that:
#in the committed condition an utterance with a lower F0 will be chosen
#in the non-committed condition an utterance with a higher F0 will be chosen

# Were predictions by F0 correct
target$F0_Dif <- target$F0_nc - target$F0_c

target$Prediction_byF0 <- ifelse(target$Text_condition == "c" & target$F0_Dif > 0 & target$Sound_chosen == "c", "correct",
                            ifelse(target$Text_condition == "c" & target$F0_Dif <  0 & target$Sound_chosen == "nc", "correct",
                            ifelse(target$Text_condition == "nc" & target$F0_Dif < 0 & target$Sound_chosen == "c", "correct",
                            ifelse(target$Text_condition == "nc" & target$F0_Dif > 0 & target$Sound_chosen == "nc", "correct",
                                                       "incorrect"))))


table(target$Prediction_byF0, target$Text_condition) #Raw numbers
tabyl(target, Prediction_byF0, Text_condition)%>% #Percentages
  adorn_percentages("col") %>%
  adorn_pct_formatting(digits = 1)


tabyl(target, Predicted_byCondition, Text_condition)%>% #Percentages
  adorn_percentages("col") %>%
  adorn_pct_formatting(digits = 1)

######### DATA ANALYSIS: Statistical analysis

####### Hypothesis 1: The utterance choice is predicted by the condition in which the utterance was produced (c/nc)
#Did participants perform above chance level?
new_df <- tabyl(target, workerId, Predicted_byCondition) %>% #Percentages
  adorn_percentages("row") %>%
  adorn_pct_formatting(digits = 1)

new_df_item <- tabyl(target, ID, Predicted_byCondition) %>% #Percentages
  adorn_percentages("row") %>%
  adorn_pct_formatting(digits = 1)


new_df$Percentage_correctResponses <- parse_number(new_df$Expected)

summary(new_df$Percentage_correctResponses)

res <- t.test(new_df$Percentage_correctResponses, mu = 50)
res$p.value
res$estimate
res$conf.int

####### Hypothesis 2: The choice of the utterance is predicted by its prosodic features
# The fixed effects that were found to be significant in Vaiksnoraite et al 2018:
# PA on the last content words (4 levels),
# Durational difference
# F0 difference
# the models are fitted for committed and non-committed condition separately.

target$PA_prominence <-  as.factor(relevel(target$PA_prominence, ref= "BothOtherPAs"))
target$Sound_chosen <- as.factor(target$Sound_chosen)

# centralize durational differences
target$Dur_Dif_centralized <-scale(target$Dur_Dif, center=TRUE, scale=TRUE)
target$F0_Dif_centralized <-scale(target$F0_Dif, center=TRUE, scale=TRUE)

options(scipen=999)

m1 <- glmer(Sound_chosen ~ PA_prominence * Dur_Dif * F0_Dif + (1 + PA_prominence * Dur_Dif * F0_Dif |workerId) + (1|utt) +  (1|talker) , data = target[target$Text_condition == "c", ], family = binomial)
summary(m1)
fixef(m1) 
ranef(m1)

m2 <- glmer(Sound_chosen ~ PA_prominence * Dur_Dif * F0_Dif + (1 + PA_prominence * Dur_Dif * F0_Dif|workerId) + (1|utt) +  (1|talker) , data = target[target$Text_condition == "nc", ], family = binomial)
summary(m2)




