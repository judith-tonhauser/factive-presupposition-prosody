function make_slides(f) {
  var   slides = {};

// botcaptcha slide

  slides.botcaptcha = slide({
      name : "botcaptcha",
      start: function() {

      // define possible speaker and listener names
      // fun fact: 10 most popular names for boys and girls
      var listener = _.shuffle(["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles"])[0];
      var speaker = _.shuffle(["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Margaret"])[0];

      var story = speaker + ' says to ' + listener + ': "It\'s a beautiful day, isn\'t it?"' + '<br><br><br><br> Who is ' + speaker + ' talking to? Write the name into the box. <br> <br> (If you are not a bot, you will be able to do this easily.)';

      $("#story").html(story);

      // don't allow enter press in text field
      $('#listener-response').keypress(function(event) {
          if (event.keyCode == 13) {
              event.preventDefault();
          }
      });

      // don't show any error message
      $("#error").hide();
      $("#error_incorrect").hide();
      $("#error_2more").hide();
      $("#error_1more").hide();

      // amount of trials to enter correct response
      var trial = 0;

      // when button is pressed
      $("#next").on("click", function() {

        // get rid of spaces in response
        response = $("#listener-response").val().replace(" ","");

        // response correct
        if (listener.toLowerCase() == response.toLowerCase()) {
            // I always save their response globally in the data, but I don't know
            // whether you want that
            exp.go();

        // response false
        } else {
            trial = trial + 1;
            $("#error_incorrect").show();
            if (trial == 1) {
                $("#error_2more").show();
            } else if (trial == 2) {
                $("#error_2more").hide();
                $("#error_1more").show();
            } else {
                // incorrect response on third try
                $("#error_incorrect").hide();
                $("#error_1more").hide();
                // remove button, so that the participant can't advance
                $("#next").hide();
                // deactivate text field
                $('#listener-response').css("opacity", "0.2");
                $('#listener-response').prop("disabled", true);
                $("#error").show();
            };
        };
            
        });

    },
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

// i0 slide with instructions

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

// more instructions (not used in this experiment)
  slides.instructions = slide({
    name : "instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });
  
// short repeat of the instructions
  
  slides.instructions1 = slide({
    name : "instructions1",
    start : function() {
    $('.bar').css('width', ( (100*(exp.phase)/exp.nQs) + "%"));    	
    	var inst1 = "Let's get started!  ";
//    	console.log(block_order);
    	inst1 = inst1 + "<br><br>Please read the description of the scenario and listen carefully to both versions of the underlined sentence. <br> <br> Select the version that sounds better as part of the scenario."    		
    	$("#inst1").html(inst1);
    },
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  }); 
     
// slides for the stimuli

  slides.block1 = slide({
    name : "block1",
    present : exp.stims,
    //start : function() {
    //  $(".err").hide();
    //},
    start : function() {
    $('.bar').css('width', ( (100*(exp.phase)/exp.nQs) + "%"));    	    	
      $(".err").hide();
    },
    present_handle : function(stim) {
      this.stim = stim;
    	this.stim.trial_start = Date.now();      
        $(".err").hide();  
      // don't need this because we're not using sliders   	
	  //this.init_sliders();
      //exp.sliderPost = null;	 
      //console.log(this.stim);  
      ///  
      var sentence = "";
      sentence = this.stim.sentence;	  	
	  $(".sentence").html(sentence);
	  var radioSounds = "<th width='300px'><audio controls><source src=stimuli/" + this.stim.sound1 + " type='audio/wav'> Your browser does not support the audio element. </audio></th><th width='300x''><audio controls> <source src=stimuli/" + this.stim.sound2 + " type='audio/wav'> Your browser does not support the audio element.</audio></th>";
	  var radioresponses = "<th width='300px'><input type='radio' name='radioresponse' value='1'/></th><th width='300px''><input type='radio' name='radioresponse' value='2'/></th>";
	var radiolabels = "<th width='300px'><span>Version 1:</span></th><th width='300px'>Version 2: </th>";
    $(".radioResponses").html(radioresponses);	
    $(".radioLabels").html(radiolabels);	
    $(".radioSounds").html(radioSounds);
	  ///
	  var leftLabel = "";
	  if (this.stim.block == "prior") {
	  		leftLabel = "impossible";
	  } else {
	  		leftLabel = "no"}
	  $(".leftLabel").html(leftLabel);
	  var rightLabel = "";
	  if (this.stim.block == "prior") {
	  		rightLabel = "definitely";
	  } else {
	  		rightLabel = "yes"}
	  $(".rightLabel").html(rightLabel);
	  ///
	  var scenario = "";
	  //scenario = "<font size=4>" + this.stim.scenario + "</font> <br> <br>";
	  scenario = "<font size=4><i>" + "bla bla bla bla" + "</i></font> <br> <br>";
	  $(".scenario").html(scenario);
	  var task = "Select the version that sounds better as part of the scenario.";
	  //console.log(task);
	  $(".task").html(task);
// 	  var sounds = "";
// 	  sounds = "<font size=4>"+ +"</font> <br><br> <audio controls source src=stimuli/"+this.stim.sound+" type=&quot;audio/wav&quot; >bla</audio>";
// 	  $(".sounds").html(sounds);
    },

// this defines a button for the trials, which expects a radio button response
    button : function() {
    	//console.log(exp.sliderPost);
    	//console.log($("input[name='radioresponse']:checked").val());
      if ($("input[name='radioresponse']:checked").val() != null) {
        this.log_responses();
        _stream.apply(this); //use exp.go() if and only if there is no "present" data.
      } else {
        $(".err").show();
      }
    },

// slider response button
//     button : function() {
//     	//console.log(exp.sliderPost);
//     	console.log($("input[name='radioresponse']:checked").val());
//       if (exp.sliderPost != null) {
//         this.log_responses();
//         _stream.apply(this); //use exp.go() if and only if there is no "present" data.
//       } else {
//         $(".err").show();
//       }
//     },


//     init_sliders : function() {
//       utils.make_slider("#single_slider1", function(event, ui) {
//         exp.sliderPost = ui.value;
//       });
//     },
 


// here is where we log the response for each trial and important info about the trial
 //{list:"1",id:"know-2-P14",condition:"nc",sound1:"P14-K-2-nc.wav",sound2:"P14-K-2-c.wav",verb:"know",speaker:"P14",scenario:"bla bla bla <u> bla bla </u> bla bla",sentence:"Perhaps he knew that she was married"}
    
    log_responses : function() {
      exp.data_trials.push({
      "block" : "block1",
      "list" : this.stim.list,      
   	  "slide_number_in_experiment" : exp.phase,
   	  "id": this.stim.id,
   	  "condition": this.stim.condition,
   	  "sound1": this.stim.sound1,
   	  "sound2": this.stim.sound2,
   	  "speaker": this.stim.speaker,
   	  "verb": this.stim.verb,
	  //"prior_fact" : this.stim.prior_fact,
      //"response" : exp.sliderPost,
      "response" : $("input[name='radioresponse']:checked").val(),
      "rt" : Date.now() - this.stim.trial_start
      });
    }
  }); 
   
// questionnaire

  slides.questionaire =  slide({
    name : "questionaire",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
//        enjoyment : $("#enjoyment").val(),
//        asses : $('input[name="assess"]:checked').val(),
        american : $('input[name="ame"]:checked').val(),
        age : $("#age").val(),
        gender : $('input[name="gender"]:checked').val(),
//        gender : $("#gender").val(),
//        education : $("#education").val(),
        comments : $("#comments").val(),
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });
  
// last slide: finished!  

  slides.finished = slide({
    name : "finished",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "condition" : exp.condition,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      console.log(exp.data);
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

///// everything above this line is the function make_slides 

/// init ///
function init() {

// added this for UniqueTurker
$(document).ready(function(){
   var ut_id = "judith-tonhauser-attitude_preds_projection-exp4";
   if (UTWorkerLimitReached(ut_id)) {
     $(".slide").hide();
     $("body").html("You have already completed the maximum number of HITs allowed by this requester. Please click 'Return HIT' to avoid any impact on your approval rating.");
}});

// lists and experiment trials are defined in the following

// number of lists  
//var lists = [0,1,2,3,4,5,6,7];
var lists = [0,1];

// get random list number
var listNumber = _.shuffle(lists)[0];  

console.log(listNumber);

// for spreadsheet
// list, id (of the item), condition (which sound is original), sound1, sound2, verb, speaker, scenario (entire discourse, with sentence underlined and final sentence included), sentence

exp.stims = [ 
[{list:"1",id:"know-2-P14",condition:"nc",sound1:"P14-K-2-nc.wav",sound2:"P14-K-2-c.wav",verb:"know",speaker:"P14",scenario:"bla bla bla <u> bla bla </u> bla bla",sentence:"Perhaps he knew that she was married"}, {list:"1",id:"aware-2-P11",condition:"c",sound1:"P11-A-2-c.wav",sound2:"P11-A-2-nc.wav",verb:"aware",speaker:"P11",scenario:"bla bla bla <u> bla bla </u> bla bla",sentence:"Perhaps she was aware that he was unreliable"}], [{list:"2",id:"control2",condition:"control",sound1:"F2.wav",sound2:"F2.wav",verb:"control",speaker:"F2",scenario:"bla bla bla <u> bla bla </u> bla bla",sentence:"I was invited to the party"}, {list:"2",id:"know-3-P4",condition:"nc",sound1:"P4-K-3-nc.wav",sound2:"P4-K-3-c.wav",verb:"know",speaker:"P4",scenario:"bla bla bla <u> bla bla </u> bla bla",sentence:"Perhaps she knew that he was wrong"}] 
][listNumber];

// trials is a randomized array
exp.stims = _.shuffle(exp.stims);	
	
console.log(exp.stims);
  
  exp.trials = [];
  exp.catch_trials = [];
  exp.condition = {}; //can randomize between subject conditions here
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  exp.structure=["botcaptcha", "i0", "instructions1", "block1", 'questionaire', 'finished'];
//exp.structure=["botcaptcha", "i0", "instructions","instructions1", "block1", 'questionaire', 'finished'];
  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

//  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined
                    
   exp.nQs = 1 + 1 + 9 + 1; // botcheck + instructions + trials + questionnaire
  $(".nQs").html(exp.nQs);

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}