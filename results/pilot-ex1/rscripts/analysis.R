setwd('/Users/elenavaiksnoraite/Documents/Github/factive-presupposition-prosody/results/pilot-ex1/rscripts')
require(tidyverse)
library(stringr)
library(magrittr)
library(ordinal)
library(dplyr)

source("helpers.r")


######## PRE-PROCESSING

# load raw data
# multiple rows per stimuli ()
results <- read.csv("../data/pilot-exp1-results.csv") %>% 
  mutate_if(is.character,as.factor)  %>% 
  mutate(Prolific.ID = as.factor(as.character(Prolific.ID)))
nrow(results) 
head(results)

# load additional annotation data (prosody from the production experiment)
prosody = read.csv("../data/prosody-data.csv") %>%
  mutate_if(is.character,as.factor)  %>%
  select(CC_dur, gender,lcw_PA, PA_LCW_Height, PA_LCW_Movement,PA_PRED_Height, talker, lcw_dur_norm, F0mean_c,lcw_PA_Focus,File)
nrow(prosody)
head(prosody)
colnames(prosody)[colnames(prosody) == "gender"] <- "Speaker_gender" 

# merge additional annotation data 
results %<>%
  left_join(prosody,by=c("File")) 
head(results)


# Creating a condition column
results$Condition <- ifelse(grepl("-nc.wav", results$File, fixed = TRUE), "nc",
                            ifelse(grepl("-c.wav", results$File, fixed = TRUE), "c",
                                   "filler"))

results$Condition <- as.factor(results$Condition)

# Creating an utterance column
results$Utterance <- ifelse(grepl("-A-1-", results$File, fixed = TRUE), "A1",
                     ifelse(grepl("-A-2-", results$File, fixed = TRUE), "A2",
                     ifelse(grepl("-A-3-", results$File, fixed = TRUE), "A3",
                     ifelse(grepl("-D-2-", results$File, fixed = TRUE), "D2",
                     ifelse(grepl("-K-2-", results$File, fixed = TRUE), "K2", 
                     ifelse(grepl("-K-3-", results$File, fixed = TRUE), "K3",        
                     ifelse(grepl("-N-2-", results$File, fixed = TRUE), "N2",
                                   "filler")))))))

results$Utterance <- as.factor(results$Utterance)

# Creating new column for certainty ratings
results$Rating <- ifelse(results$Value == "No%2C not certain", 1,
                         ifelse(results$Value == "<span style='visibility: hidden;'>2</span>", 2,
                                ifelse(results$Value == "Possibly not certain", 3,
                                       ifelse(results$Value == "<span style='visibility: hidden;'>4</span>", 4,
                                              ifelse(results$Value == "Possibly certain", 5,
                                                     ifelse(results$Value == "<span style='visibility: hidden;'>6</span>", 6,       
                                                            7))))))

#write_file(results, path="../data/raw_data_full-pilot-exp1.csv")

#Exclude rows that are not acceptability judgments
d <- droplevels(subset(results, results$ElementType == "Scale" ))
nrow(d)
colnames(d)

#Exclude participants that rated the controls below 5  (very generous)
no_attention = d %>%
  group_by(Prolific.ID,Condition) %>%
  summarize(Mean = mean(Rating)) %>%
  filter(Mean < 5 & Condition == "filler")
exluded_subjects = unique(no_attention$Prolific.ID) #the number of excluded subjects
proportion_excluded_subjects = round(length(exluded_subjects)*100 / length(unique(d$Prolific.ID)),2) #the proportion of excluded subjects

d = d %>%
  filter(! Prolific.ID %in% exluded_subjects & Condition != "filler")
nrow(d)

######## VISUALIZATION
#visualization of the distribution of responses
ggplot(d, aes(x=Rating)) +
  geom_histogram()

#visualization of the distribution of responses by condition
ggplot(d, aes(x=Rating,fill=Condition)) +
  geom_histogram() +
  stat_count()

#Get means by condition
agr = d %>%
  group_by(Condition) %>%
  summarize(Mean = mean(Rating), CILow = ci.low(Rating), CIHigh = ci.high(Rating)) %>%
  mutate(YMin = Mean - CILow, YMax = Mean + CIHigh)

ggplot(agr, aes(x=Condition, y=Mean)) +
  geom_bar(stat="identity",fill="gray60",color="black") +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.25) +
  xlab("Condition") +
  ylab("Mean rating (lower = 'less certain')") 
ggsave("../graphs/means_condition.pdf")

#Get means by condition and by participant
agr_participant = d %>%
  group_by(Condition,Prolific.ID) %>%
  summarize(Mean = mean(Rating), CILow = ci.low(Rating), CIHigh = ci.high(Rating)) %>%
  mutate(YMin = Mean - CILow, YMax = Mean + CIHigh)
  ungroup() %>%
  mutate(Prolific.ID = fct_drop(as.factor(Prolific.ID)))

ggplot(agr, aes(x=Condition, y=Mean)) +
  geom_bar(stat="identity",fill="gray60",color="black") +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.25) +
  geom_line(data=agr_participant,aes(group=Prolific.ID,color=Prolific.ID),alpha=.8) +
  xlab("Condition") +
  ylab("Mean rating (lower = 'less certain')") 
ggsave("../graphs/means_condition_byparticipant.pdf")

# get condition & item means
agr_item = d %>%
  group_by(Condition,Utterance) %>%
  summarize(Mean = mean(Rating), CILow = ci.low(Rating), CIHigh = ci.high(Rating)) %>%
  mutate(YMin = Mean - CILow, YMax = Mean + CIHigh) 

dodge = position_dodge(.9)

ggplot(agr, aes(x=Condition, y=Mean)) +
  geom_bar(stat="identity",fill="gray60",color="black") +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.25) +
  geom_line(data=agr_item,aes(group=Utterance,color=Utterance),alpha=.5) +
  xlab("Condition") +
  ylab("Mean rating (lower = 'less certain')") 
ggsave("../graphs/means_item.pdf",width=9)

# get means depending on the PA on the last content word
table(d$lcw_PA)
d$lcw_PA <- as.factor(d$lcw_PA)

agr_focus = d %>%
  group_by(lcw_PA) %>%
  summarize(Mean = mean(Rating), CILow = ci.low(Rating), CIHigh = ci.high(Rating)) %>%
  mutate(YMin = Mean - CILow, YMax = Mean + CIHigh) 

dodge = position_dodge(.9)

ggplot(agr_focus, aes(x=lcw_PA, y=Mean)) +
  geom_bar(stat="identity",fill="gray60",color="black") +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.25) +
  xlab("Pitch accent on the last content word") +
  ylab("Mean rating (lower = 'less certain')") 
ggsave("../graphs/means_PA_lcw.pdf",width=9)



###### ANALYSIS

### Hypothesis 1: Certainty rating is predicted by the condition in which the utterance was produced (c/nc)
d$Rating <- as.factor(d$Rating)
Hyp1 = clmm(Rating ~ Condition + (1+Condition|Prolific.ID) + (1|File), data = d)
summary(Hyp1)


### Hypothesis 2: Certainty rating is predicted by prosody
#The fixed effects that were found to be significant in Vaiksnoraite et al 2018
Hyp2 = clmm(Rating ~ lcw_dur_norm * lcw_PA *  F0mean_c  + (1|Prolific.ID) + (1|File) , data = d  )
summary(Hyp2)



