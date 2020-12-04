// This is a simple demo script, feel free to edit or delete it
// Find a tutorial and the list of availalbe elements at:
// https://www.pcibex.net/documentation/

PennController.ResetPrefix(null) // Shorten command names (keep this line here)

// Show the 'intro' trial first, then all the 'experiment' trials in a random order
// then send the results and finally show the trial labeled 'bye'
Sequence( "intro", "test", randomize("experiment") ,  "demo",  SendResults() , "bye" )


newTrial("demo",
    newText("<p>Four questions about you and your language background:</p>")
    .print()
    ,
    newScale("gender", "Female", "Male", "I would prefer to not answer", "Other" )
        .settings.before(newText("Which gender do you identify most with?"))
        .labelsPosition("right")
        .print()
        .log()
    ,    
    newTextInput("Age")
        .settings.before( newText("left", "Age:") )
        .print()
        .log()
    ,
    newTextInput("Language")
        .settings.before( newText("left", "Native language:") )
        .settings.after( newText("<p>(the language(s) spoken at home when you were a child):</p>"))
        .print()
        .log()
    ,
    newText("<p>If English is your native language, are you a speaker of AMERICAN English (as opposed to e.g. Australian or Indian English)?</p>")
        .print()
    ,
    newScale("Language",  "Yes", "No")
        .labelsPosition("right")
        .print()
        .log()
    ,
    newButton("finish", "Finish")
    .print()
    .wait()    
    )

newTrial( "intro" ,
    newText("<p>Welcome! In this language experiment, you will need to listen to utterances. Please only participate if you are wearing headphones or are in a quiet place where you can hear the utterances well. </p>")
    .print()
    ,
    newText("<p>Imagine you are at a party. You walk into the kitchen and overhear somebody say something. Here is an example :</p>")
        .print()
        ,
    newText("Debby (about Sue):").print()
    ,
    newAudio("description", "sample.wav")
      //  .play()
        .print()
        ,    
   newText("<p>Please pay attention not just to <b>what</b> is said but also to  <b>how</b> it is said. You can listen to each utterance as often as you like. </p>")
        .print()
    ,
    newText("<p>We then ask you a question about what you heard. For example: Is Debby certain that the store was closed?</p>")
        .print()
    ,
    newText("<p>You will indicate your answer on this scale:</p>")
        .print()
    ,
    newScale("score",   "No,not certain ", "<p> </p>   ", " Possibly not certain ", "    <p> </p>    ", " Possibly certain ", "   <p> </p>    ",  "Yes,  certain ")
        .settings.labelsPosition("top")
        .print()
        ,
    newText("<p><b>Payment</b> : You will listen to 9 utterances. You will be paid 80 cents to participate in this experiment, which will take about 4 minutes to complete.</p>")
        .print()
        ,
    newText("<p><b>To make sure you are paying attention, we have included some questions for which we know the correct answers. If you listen carefully, you will definitely get those right.</b></p>")
        .print()
        ,
    newText("<p> Survey: At the end of the experiment, we ask you four short questions about you and your language background. You will be paid no matter what answers you give in this survey (so please answer truthfully).    </p>")          
        .print()
        ,
    newText("<p>Please enter your Prolific ID and then click the button below to start the experiment.</p>")
        .print()
        ,    
    newTextInput("inputID")
        .print()
        .wait()
    ,    
    newButton("Start")
        .print()
        .wait()
    ,
    newVar("ID")
        .global()
        .set( getTextInput("inputID") )
    .log( "ID" , getVar("ID") )    
)

newTrial("test" ,
    newText("<p>Let's get started!</p>").print()
    ,
    newText("<p>Imagine you are at a party. You walk into the kitchen and overhear somebody ask something.</p>").print()
    ,
    newText("<p>Listen to the audio and answer the question about whether the speaker is certain.</p>").print()
    ,
    newButton("Continue")
        .print()
        .wait()
)
    

SetCounter();
// This Template command generates as many trials as there are rows in myTable.csv
Template(    
    GetTable( "myTable.csv")
    .setGroupColumn( "List" )
        ,
    // Row will iteratively point to every row in myTable.csv
    row => newTrial( "experiment" ,
        // The trials are minimal: choose a pronoun from a DropDown list
        newText(row.Sentence).print()
        ,
        newText("<p> </p>").print()
        ,
        newText("<p> </p>").print()
        ,
        newAudio(row.Sound)
      //.play()
        .print()
        ,
        newText("<p> </p>").print()
        ,
        newText("<p> </p>").print()
        ,
        newText(row.Question).print()
        ,
       newText("<p> </p>").print()
       ,
       newText("<p> </p>").print()
        ,
        newScale("score",   "No, not certain", " ", "Possibly not certain ", " ", "Possibly certain", " ", "Yes, certain")
        .settings.labelsPosition("top")
        .print()     // Make sure to log the participant's selection
        .wait()
        .log() 
        ,
        newText("<p> </p>").print()
        ,
        newText("<p> </p>").print()
        ,
        newButton("Continue")
            .print()
            .wait()
                )
    .log( "Sentence" , row.Sentence )
    .log( "Sound" , row.Sound )
    .log("List", row.List)
    // Add these three columns to the results lines of these Template-based trials
)




// Spaces and linebreaks don't matter to the script: we've only been using them for the sake of readability
newTrial( "bye" ,
    newText("Thank you for your participation!")
        .print()
    ,
    newText("<p><a href='https://www.pcibex.net/'>Click here to validate your participation.</a></p>")
        .print()
    ,
    newButton().wait()  // Wait for a click on a non-displayed button = wait here forever
)
.setOption( "countsForProgressBar" , false )
// Make sure the progress bar is full upon reaching this last (non-)trial
