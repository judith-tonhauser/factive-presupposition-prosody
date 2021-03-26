setwd('/Users/elenavaiksnoraite/Downloads/')
require(tidyverse)
library(stringr)
library(magrittr)
library(ordinal)
library(dplyr)

read.pcibex <- function(filepath, auto.colnames=TRUE, fun.col=function(col,cols){cols[cols==col]<-paste(col,"Ibex",sep=".");return(cols)}) {
  n.cols <- max(count.fields(filepath,sep=",",quote=NULL),na.rm=TRUE)
  if (auto.colnames){
    cols <- c()
    con <- file(filepath, "r")
    while ( TRUE ) {
      line <- readLines(con, n = 1, warn=FALSE)
      if ( length(line) == 0) {
        break
      }
      m <- regmatches(line,regexec("^# (\\d+)\\. (.+)\\.$",line))[[1]]
      if (length(m) == 3) {
        index <- as.numeric(m[2])
        value <- m[3]
        if (index < length(cols)){
          cols <- c()
        }
        if (is.function(fun.col)){
          cols <- fun.col(value,cols)
        }
        cols[index] <- value
        if (index == n.cols){
          break
        }
      }
    }
    close(con)
    return(read.csv(filepath, comment.char="#", header=FALSE, col.names=cols))
  }
  else{
    return(read.csv(filepath, comment.char="#", header=FALSE, col.names=seq(1:n.cols)))
  }
}

el<- read.pcibex("results-20.csv")



source("helpers.r")

######## PRE-PROCESSING

## Load raw data
results <- read.csv("exp2-pilot-anonymous2.csv", sep=";")
nrow(results) 
head(results)

# load myTable.csv to create a column for expected answers
responses <- read.csv("myTable.csv") %>%
  select(Correct_answer, Sound1, List)

results %<>%
  left_join(responses,by=c("Sound1", "List")) 

# load prosody data from the production experiment to merge additional annotation data 
prosody <- read.csv("prosody-wide.csv")
prosody$X <- NULL
head(prosody)

results %<>%
  left_join(prosody,by=c("utt", "talker")) 
head(results)
nrow(results)
results$Choice <- ifelse(results$Value == "one", "Sound1", "Sound2")

results %<>%
  mutate_if(is.character,as.factor)  %>% 
  mutate(workerId = as.factor(as.character(workerId)))


#### Check whether the participants left any comments
comments = results %>%
  filter(PennElementName == "Comments")
unique(comments$Value)


### DATA EXCLUSION 1: Identify participants that did not listen to Sound1 or Sound2 at some point in the experiment

no_listen = results %>%
  filter(PennElementType == "Audio" & Value == "Never") %>%
  group_by(workerId) 
excluded_subjects1 = unique(no_listen$workerId) #the number of excluded subjects
proportion_excluded_subjects1 = round(length(excluded_subjects1)*100 / length(unique(results$workerId[!(results$workerId=="NA")])),2) #the proportion of excluded subjects

### DATA EXCLUSION 2: Participants that did not behave as expected on controls
### Identify the number of participants that did not perform on the controls as expected
control_performance = results %>%
  filter(text_condition == "control") %>%
  group_by(workerId) %>%
  filter(Correct_answer != Choice)
excluded_subjects2 = unique(control_performance$workerId) #the number of excluded subjects
proportion_excluded_subjects2 = round(length(excluded_subjects2)*100 / length(unique(results$workerId[!(results$workerId=="NA")])),2) #the proportion of excluded subjects

results$PennElementType <- as.character(results$PennElementType)
results  <- filter(results,PennElementType == "Scale")

#Exclude participants that  didn't listen to some stimuli or behaved unexpectedly on controls
df <- filter(results, ! workerId %in% excluded_subjects1 & !workerId %in% excluded_subjects2) 
nrow(df)


# DATA ANALYSIS
df$Expected_bycond <- ifelse(df$Choice == df$Correct_answer, "expected", "unexpected")

# Look at committed condition in text:
df_committed = d[d$text_condition == "c",]
## which sound was more likely to be chosen?
table(df_committed$Choice) # Sound1: 9, Sound2: 15
## does the choice of sound1 or sound2 correlate with the utterance being produced in a particular context?
table(df_committed$Expected_bycond) # Expected: 8, unexpected 16

# Look at non-committed condition in text:
df_noncommitted = d[d$text_condition == "nc",]
## which sound was more likely to be chosen?
table(df_noncommitted$Value) # Sound1: 11, Sound2: 14
table(df_noncommitted$Expected_bycondition) # Expected: 10, unexpected 15

ggplot(df_noncommitted, aes(x=PA_c,y=PA_nc) ) +
  geom_jitter(size=2,aes(color=Expected_bycondition), width = 0.15, height = 0.15) +
  geom_bar(stat="identity",fill="gray60",color="black") +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.25) +
  geom_line(data=agr_participant,aes(group=workerId,color=workerId),alpha=.8) +
  xlab("Condition") +
  ylab("Mean rating (lower = 'less certain')") 
ggsave("../graphs/means_condition_byparticipant.pdf")

###### ANALYSIS

### Hypothesis 1: The utterance choice is predicted by the condition in which the utterance was produced (c/nc)
d$Choice <- as.factor(d$Choice)
Hyp1 = glmer(Choice ~ text_condition + (1+text_condition|workerId) + (1+text_condition|utt), data = d)
summary(Hyp1)


### Hypothesis 2: The choice of the utterance is predicted by it's prosodic features
#The fixed effects that were found to be significant in Vaiksnoraite et al 2018
Hyp2 = glmer(Choice ~ PA_c * PA_nc +  F0mean_Diff  + Dur_Diff + (1|workerId) + (1|utt) , data = d)
summary(Hyp2)



