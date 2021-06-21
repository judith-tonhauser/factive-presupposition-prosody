setwd('/Users/elenavaiksnoraite/Documents/Github/factive-presupposition-prosody/results/pilot-ex1/rscripts')
require(tidyverse)
library(stringr)
library(magrittr)
library(ordinal)
library(dplyr)


source("helpers.r")


######## PRE-PROCESSING

# load raw data
# multiple rows per stimuli 
results <- read.csv("../data/exp1-pilot-anonymous.csv") %>% 
  mutate_if(is.character,as.factor)  %>% 
  mutate(workerId = as.factor(as.character(workerId)))
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
results$Condition <- ifelse(grepl("-nc.wav", results$File, fixed = TRUE), "non-committed",
                            ifelse(grepl("-c.wav", results$File, fixed = TRUE), "committed",
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

#Check whether the participants left any comments
unique(results$Comments_participants)

#Identify participants that did not listen to the stimuli
results$Value <- as.character(results$Value)
no_listen = results %>%
  filter(ElementType == "Audio" & Value == "Never") %>%
  group_by(workerId,File) 
excluded_subjects1 = unique(no_listen$workerId) #the number of excluded subjects
proportion_excluded_subjects1 = round(length(excluded_subjects1)*100 / length(unique(d$workerId)),2) #the proportion of excluded subjects

#Identify participants that rated either or both of the controls below 5 (very generous)
no_attention = results %>%
  group_by(workerId) %>%
  filter(Rating < 5 & File == "F2.wav" | Rating < 5 & File == "F1.wav")
excluded_subjects2 = unique(no_attention$workerId) #the number of excluded subjects
proportion_excluded_subjects2 = round(length(excluded_subjects2)*100 / length(unique(d$workerId)),2) #the proportion of excluded subjects

#Exclude participants that either didn't listen to some stimuli or rated controls below 5
d = results %>%
  filter(! workerId %in% excluded_subjects1 & Condition != "filler" & ElementType == "Scale" | ! workerId %in% excluded_subjects2 & Condition != "filler" & ElementType == "Scale"  )
nrow(d)


######## VISUALIZATION
#visualization of the distribution of responses
ggplot(d, aes(x=Rating)) +
  geom_histogram()

#visualization of the distribution of responses by condition
ggplot(d, aes(x=Rating)) +
  geom_histogram() +
  facet_grid(. ~ Condition) +
  xlab("Rating (lower = 'less certain')") +
  ylab("Raw count") 
ggsave("../graphs/histogram_condition.pdf")

#Get means by condition with bootstrapped 95% CI
agr = d %>%
  group_by(Condition) %>%
  summarize(Mean = mean(Rating), CILow = ci.low(Rating), CIHigh = ci.high(Rating)) %>%
  mutate(YMin = Mean - CILow, YMax = Mean + CIHigh)

ggplot(agr, aes(x=Condition, y=Mean)) +
  geom_bar(stat="identity",fill="gray60",color="black") +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.25) +
  xlab("Condition") +
  ylab("Mean rating (lower = 'less certain')") +
ggsave("../graphs/means_condition.pdf")

#Get means by condition and by participant with bootstrapped 95% CI
agr_participant = d %>%
  group_by(Condition,workerId) %>%
  summarize(Mean = mean(Rating), CILow = ci.low(Rating), CIHigh = ci.high(Rating)) %>%
  mutate(YMin = Mean - CILow, YMax = Mean + CIHigh)
  ungroup() %>%
  mutate(workerId = fct_drop(as.factor(workerId)))

ggplot(agr, aes(x=Condition, y=Mean)) +
  geom_bar(stat="identity",fill="gray60",color="black") +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.25) +
  geom_line(data=agr_participant,aes(group=workerId,color=workerId),alpha=.8) +
  xlab("Condition") +
  ylab("Mean rating (lower = 'less certain')") 
ggsave("../graphs/means_condition_byparticipant.pdf")

# get condition & item means with bootstrapped 95% CI
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

# get means depending on the PA on the last content word with bootstrapped 95% CI
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

# get means depending on the PA on the last content word (binary) with bootstrapped 95% CI
d$lcw_PA_Focus <- as.factor(d$lcw_PA_Focus)

agr_focus = d %>%
  group_by(lcw_PA_Focus) %>%
  summarize(Mean = mean(Rating), CILow = ci.low(Rating), CIHigh = ci.high(Rating)) %>%
  mutate(YMin = Mean - CILow, YMax = Mean + CIHigh) 

dodge = position_dodge(.9)

ggplot(agr_focus, aes(x=lcw_PA_Focus, y=Mean)) +
  geom_bar(stat="identity",fill="gray60",color="black") +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.25) +
  xlab("Pitch accent on the last content word") +
  ylab("Mean rating (lower = 'less certain')") 
ggsave("../graphs/means_PA_lcw_binary.pdf",width=9)


# get duration of last content word and a linear regression predicting y~x
ggplot(d, aes(x=lcw_dur_norm,y=Rating)) + 
  geom_point() +
  geom_smooth(method="lm") +
  xlab("Duration of the last content word") +
  ylab("Mean rating (lower = 'less certain')") 
ggsave("../graphs/rating_duration.pdf",width=9)

# get duration of last content word and a linear regression predicting y~x
ggplot(d, aes(x=F0mean_c,y=Rating)) + 
  geom_point()+
  geom_smooth(method="lm") +
  xlab("Overall mean F0 of the utterance (centered)") +
  ylab("Mean rating (lower = 'less certain')") 
ggsave("../graphs/rating_F0.pdf",width=9)



###### ANALYSIS

### Hypothesis 1: Certainty rating is predicted by the condition in which the utterance was produced (c/nc)
d$Rating <- as.factor(d$Rating)
Hyp1 = clmm(Rating ~ Condition + (1+Condition|workerId) + (1+Condition|Utterance), data = d)
summary(Hyp1)


### Hypothesis 2: Certainty rating is predicted by prosody
#The fixed effects that were found to be significant in Vaiksnoraite et al 2018
Hyp2 = clmm(Rating ~ lcw_dur_norm * lcw_PA *  F0mean_c  + (1|workerId) + (1|Utterance) , data = d  )
summary(Hyp2)



