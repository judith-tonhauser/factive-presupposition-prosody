#This script reads in a CSV file with experiment stimuli organized into one row each, with experimental lists assigned, and returns a CSV file in which each row is a lexical entry with identifiers needed to run the experiment on AMT 

#Based on a script by Marie, modified by Judith in August 2014 and again May 2020

import csv
import re
import sys
	

src_filename = sys.argv[1]
output_filename = sys.argv[2]

reader = csv.reader(open(src_filename))
writer = csv.writer(open(output_filename, 'w'), delimiter=',')

# header is a list containing the first line:
header = next(reader)

newHeader = []

newHeader.append("ListNumber")
newHeader.append("LexicalEntry")

print(newHeader)

writer.writerow(newHeader)

#Desired output format for each list:
#Each list is a row with a set in it
#particle is "for" ("that" for fillers)
#question is "Was it" ("Is it" for fillers)
#[{id:"...",condition:"...",context:"...",target:"...",name:"...",adj:"...",VPinf:"..."},
#{id:"...",context:"...",target:"...",name:"...",adj:"...",VPinf:"..."},
#{id:"...",context:"...",target:"...",name:"...",adj:"...",VPinf:"...",particle:"...",question:"..."},
#...],

# Iterate through the rows, each a list:
for row in reader:
	# Row is a list. You can work with it directly. I like to 
	# create a dictionary for each row, allowing easy access 
	# to keys and values:
	#d = dict(zip(header, row))
	
	#print row[6]
	
	newRow1 = []
	#List number is in the first column in the input file
	newRow1.append(row[0])
	print(newRow1)
	#Now create the lexical entry from this row by appending the information from all the columns and adding the identifiers
	list = "".join(["list:","\"",row[0],"\""])
	id = "".join(["id:","\"",row[1],"\""])
	condition = "".join(["condition:","\"",row[2],"\""])
	sound = "".join(["sound:","\"",row[3],"\""])
	verb = "".join(["verb:","\"",row[4],"\""])
	speaker = "".join(["speaker:","\"",row[5],"\""])
	speakerName = "".join(["speakerName:","\"",row[6],"\""])
	speakerGender = "".join(["speakerGender:","\"",row[7],"\""])
	utterance = "".join(["utterance:","\"",row[8],"\""])
	sentence = "".join(["sentence:","\"",row[9],"\""])
	question = "".join(["question:","\"",row[10],"\""])
	items = ",".join([list,id,condition,sound,verb,speaker,speakerName,speakerGender,utterance,sentence,question])
	newRow1.append("".join(["{",items,"}"]))
	
	print(type(newRow1))
	print(newRow1)
	writer.writerow(newRow1)
	
	
	
	
	
	