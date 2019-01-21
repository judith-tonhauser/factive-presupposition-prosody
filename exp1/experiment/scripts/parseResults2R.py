import csv
import itertools
import random
import ast

# put files in the order you want concatentated
csv_names = ["../experiment.results"] 

lines = []
headers = []

readers = [csv.DictReader(open(fn, 'rb'),delimiter="\t",quotechar='\"') for fn in csv_names]

for r in readers:
	lines.extend(list(r))
	headers = r.fieldnames
	
print headers	

#list,id,prosody,sound,verb,utterance,sentence,question

for (k,l) in enumerate(lines):
       	responselist = ast.literal_eval(l['Answer.responses'])
	for i in range(17):
		l['Response'+str(i)] = responselist[i]

	triallist = ast.literal_eval(l['Answer.trials'])
	print triallist
	for i in range(17):	
		l['List'+str(i)] = triallist[i]['list']
		l['ID'+str(i)] = triallist[i]['id']
		l['prosody'+str(i)] = triallist[i]['prosody']
		l['sound'+str(i)] = triallist[i]['sound']
		l['utterance'+str(i)] = "_".join(triallist[i]['utterance'].split(" "))
		l['sentence'+str(i)] = "_".join(triallist[i]['sentence'].split(" "))
		l['question'+str(i)] = "_".join(triallist[i]['question'].split(" "))

	del l['Answer.responses']
	del l['Answer.trials']	


headers.remove('Answer.responses')
headers.remove('Answer.trials')

for i in range(17):
	headers.append('Response'+str(i))
	headers.append('List'+str(i))
	headers.append('ID'+str(i))		
	headers.append('prosody'+str(i))
	headers.append('sound'+str(i))
	headers.append('utterance'+str(i))
	headers.append('sentence'+str(i))
	headers.append('question'+str(i))


w = csv.DictWriter(open('../../results/parsed-results.csv', 'wb'),fieldnames=headers,restval="NA",delimiter="\t")
w.writeheader()
w.writerows(lines)
