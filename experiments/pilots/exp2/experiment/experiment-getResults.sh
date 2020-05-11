#!/usr/bin/env sh
pushd /Applications/aws-mturk-clt-1.3.1/bin
./getResults.sh $1 $2 $3 $4 $5 $6 $7 $8 $9 -successfile /Users/judith/Documents/current-research-topics/NSF-NAI/prop-att-experiments/5-prosody-factives/3-perception-1a/run-AMT-experiment/experiment.success -outputfile /Users/judith/Documents/current-research-topics/NSF-NAI/prop-att-experiments/5-prosody-factives/3-perception-1a/run-AMT-experiment/experiment.results
popd