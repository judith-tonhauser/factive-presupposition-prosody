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
    	inst1 = inst1 + "<br><br>Imagine you are at a party. You walk into the kitchen and overhear somebody ask something. <br> <br> Listen to the audio and answer the question about whether the speaker is certain."    		
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
	  var radioresponses = "<th width='80px'><input type='radio' name='radioresponse' value='1'/></th><th width='80px''><input type='radio' name='radioresponse' value='2'/></th><th width='80px'><input type='radio' name='radioresponse' value='3'/></th><th width='80px'><input type='radio' name='radioresponse' value='4'/></th><th width='80px'><input type='radio' name='radioresponse' value='5'/></th><th width='80px'><input type='radio' name='radioresponse' value='6'/></th><th width='80px'><input type='radio' name='radioresponse' value='7'/></th>";
	var radiolabels = "<th width='80px'><span>No, not certain</span></th><th width='80px'><span></span></th><th width='80px'><span>Possibly not certain</span></th><th width='80px''></th><th width='80px'>Possibly certain</th><th width='80px'></th><th width='80px'>Yes, certain</th>";
    $(".radioResponses").html(radioresponses);	
    $(".radioLabels").html(radiolabels);	
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
	  var question = "";
	  //console.log(this.stim.block);
	  question = this.stim.question;
	  $(".question").html(question);
	  var sound = "";
	  sound = "<font size=4>"+this.stim.sentence+"</font> <br><br> <audio controls source src=stimuli/"+this.stim.sound+" type=&quot;audio/wav&quot; >bla</audio>";
	  $(".sound").html(sound);
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
 //{list:"1",id:"know-2-P14",condition:"nc",sound:"P14-K-2-nc.wav",verb:"know",speaker:"P14",speakerName:"Patty",speakerGender:"fem",utterance:"Perhaps he knew that she was married",sentence:"Patty (about Greg and Tara):",question:"Is Patty certain that Tara was married?"}
    
    log_responses : function() {
      exp.data_trials.push({
      "block" : "block1",
      "list" : this.stim.list,      
   	  "slide_number_in_experiment" : exp.phase,
   	  "id": this.stim.id,
   	  "condition": this.stim.condition,
   	  "speaker": this.stim.speaker,
   	  "verb": this.stim.verb,
   	  "question" : this.stim.question,
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
var lists = [0,1,2,3,4,5,6,7];

// get random list number
var listNumber = _.shuffle(lists)[0];  

console.log(listNumber);

// {list: 1, block: "projective", content: "item1", gender: "F", name: "Carolyn", prior: "high_prior", prior_fact: "Emma is in law school", question: "Emma studied on Saturday morning", short_trigger: "confirm", trigger: "confirm", trigger_class: "C", sentence: "X says to Y"}
	
exp.stims = [ 
[{list:"1",id:"know-2-P14",condition:"nc",sound:"P14-K-2-nc.wav",verb:"know",speaker:"P14",speakerName:"Patty",speakerGender:"fem",utterance:"Perhaps he knew that she was married",sentence:"Patty (about Greg and Tara):",question:"Is Patty certain that Tara was married?"}, {list:"1",id:"aware-2-P11",condition:"c",sound:"P11-A-2-c.wav",verb:"aware",speaker:"P11",speakerName:"Ethan",speakerGender:"masc",utterance:"Perhaps she was aware that he was unreliable",sentence:"Ethan (about Cassie and Bruce):",question:"Is Ethan certain that Bruce was unreliable?"}, {list:"1",id:"control2",condition:"control",sound:"F2.wav",verb:"control",speaker:"F2",speakerName:"June",speakerGender:"fem",utterance:"I was invited to the party",sentence:"June (about herself):",question:"Is June certain that she was invited to the party?"}, {list:"1",id:"know-3-P4",condition:"nc",sound:"P4-K-3-nc.wav",verb:"know",speaker:"P4",speakerName:"Alexandra",speakerGender:"fem",utterance:"Perhaps she knew that he was wrong",sentence:"Alexandra (about Maggie and Toby):",question:"Is Alexandra certain that Toby was wrong?"}, {list:"1",id:"aware-1-P6",condition:"nc",sound:"P6-A-1-nc.wav",verb:"aware",speaker:"P6",speakerName:"Dana",speakerGender:"fem",utterance:"Perhaps she was aware that he was a terrible administrator",sentence:"Dana (about Selena and Scott):",question:"Is Dana certain that Scott was a terrible administrator?"}, {list:"1",id:"notice-2-P1",condition:"c",sound:"P1-N-2-c.wav",verb:"notice",speaker:"P1",speakerName:"Amy",speakerGender:"fem",utterance:"Perhaps she noticed that he had bad breath",sentence:"Amy (about Sue and Mark):",question:"Is Amy certain that Mark has bad breath?"}, {list:"1",id:"discover-2-P12",condition:"c",sound:"P12-D-2-c.wav",verb:"discover",speaker:"P12",speakerName:"Lucas",speakerGender:"masc",utterance:"Perhaps he discovered that he’s a father",sentence:"Lucas (about Simon):",question:"Is Lucas certain that Simon is a father?"}, {list:"1",id:"aware-3-P8",condition:"c",sound:"P8-A-3-c.wav",verb:"aware",speaker:"P8",speakerName:"Liam",speakerGender:"masc",utterance:"Perhaps she was aware that he had bad reviews",sentence:"Liam (about Joan and Lenny):",question:"Is Liam certain that Lenny had bad reviews?"}, {list:"1",id:"control1",condition:"control",sound:"F1.wav",verb:"control",speaker:"F1",speakerName:"Julie",speakerGender:"fem",utterance:"I am tired",sentence:"Julie (about herself):",question:"Is Julie certain that she is tired?"}],
[{list:"2",id:"aware-2-P11",condition:"nc",sound:"P11-A-2-nc.wav",verb:"aware",speaker:"P11",speakerName:"Ethan",speakerGender:"masc",utterance:"Perhaps she was aware that he was unreliable",sentence:"Ethan (about Cassie and Bruce):",question:"Is Ethan certain that Bruce was unreliable?"}, {list:"2",id:"aware-1-P6",condition:"c",sound:"P6-A-1-c.wav",verb:"aware",speaker:"P6",speakerName:"Dana",speakerGender:"fem",utterance:"Perhaps she was aware that he was a terrible administrator",sentence:"Dana (about Selena and Scott):",question:"Is Dana certain that Scott was a terrible administrator?"}, {list:"2",id:"control1",condition:"control",sound:"F1.wav",verb:"control",speaker:"F1",speakerName:"Julie",speakerGender:"fem",utterance:"I am tired",sentence:"Julie (about herself):",question:"Is Julie certain that she is tired?"}, {list:"2",id:"discover-2-P12",condition:"nc",sound:"P12-D-2-nc.wav",verb:"discover",speaker:"P12",speakerName:"Lucas",speakerGender:"masc",utterance:"Perhaps he discovered that he’s a father",sentence:"Lucas (about Simon):",question:"Is Lucas certain that Simon is a father?"}, {list:"2",id:"know-2-P14",condition:"c",sound:"P14-K-2-c.wav",verb:"know",speaker:"P14",speakerName:"Patty",speakerGender:"fem",utterance:"Perhaps he knew that she was married",sentence:"Patty (about Greg and Tara):",question:"Is Patty certain that Tara was married?"}, {list:"2",id:"notice-2-P1",condition:"nc",sound:"P1-N-2-nc.wav",verb:"notice",speaker:"P1",speakerName:"Amy",speakerGender:"fem",utterance:"Perhaps she noticed that he had bad breath",sentence:"Amy (about Sue and Mark):",question:"Is Amy certain that Mark has bad breath?"}, {list:"2",id:"aware-3-P8",condition:"nc",sound:"P8-A-3-nc.wav",verb:"aware",speaker:"P8",speakerName:"Liam",speakerGender:"masc",utterance:"Perhaps she was aware that he had bad reviews",sentence:"Liam (about Joan and Lenny):",question:"Is Liam certain that Lenny had bad reviews?"}, {list:"2",id:"control2",condition:"control",sound:"F2.wav",verb:"control",speaker:"F2",speakerName:"June",speakerGender:"fem",utterance:"I was invited to the party",sentence:"June (about herself):",question:"Is June certain that she was invited to the party?"}, {list:"2",id:"know-3-P4",condition:"c",sound:"P4-K-3-c.wav",verb:"know",speaker:"P4",speakerName:"Alexandra",speakerGender:"fem",utterance:"Perhaps she knew that he was wrong",sentence:"Alexandra (about Maggie and Toby):",question:"Is Alexandra certain that Toby was wrong?"}],
[{list:"3",id:"aware-2-P8",condition:"c",sound:"P8-A-2-c.wav",verb:"aware",speaker:"P8",speakerName:"Liam",speakerGender:"masc",utterance:"Perhaps she was aware that he was unreliable",sentence:"Liam (about Cassie and Bruce):",question:"Is Liam certain that Bruce was unreliable?"}, {list:"3",id:"know-2-P11",condition:"nc",sound:"P11-K-2-nc.wav",verb:"know",speaker:"P11",speakerName:"Ethan",speakerGender:"masc",utterance:"Perhaps he knew that she was married",sentence:"Ethan (about Greg and Tara):",question:"Is Ethan certain that Tara was married?"}, {list:"3",id:"notice-2-P12",condition:"c",sound:"P12-N-2-c.wav",verb:"notice",speaker:"P12",speakerName:"Lucas",speakerGender:"masc",utterance:"Perhaps she noticed that he had bad breath",sentence:"Lucas (about Sue and Mark):",question:"Is Lucas certain that Mark has bad breath?"}, {list:"3",id:"know-3-P9",condition:"nc",sound:"P9-K-3-nc.wav",verb:"know",speaker:"P9",speakerName:"Sophia",speakerGender:"fem",utterance:"Perhaps she knew that he was wrong",sentence:"Sophia (about Maggie and Toby):",question:"Is Sophia certain that Toby was wrong?"}, {list:"3",id:"aware-1-P4",condition:"nc",sound:"P4-A-1-nc.wav",verb:"aware",speaker:"P4",speakerName:"Alexandra",speakerGender:"fem",utterance:"Perhaps she was aware that he was a terrible administrator",sentence:"Alexandra (about Selena and Scott):",question:"Is Alexandra certain that Scott was a terrible administrator?"}, {list:"3",id:"discover-2-P3",condition:"c",sound:"P3-D-2-c.wav",verb:"discover",speaker:"P3",speakerName:"Amelia",speakerGender:"fem",utterance:"Perhaps he discovered that he’s a father",sentence:"Amelia (about Simon):",question:"Is Amelia certain that Simon is a father?"}, {list:"3",id:"control1",condition:"control",sound:"F1.wav",verb:"control",speaker:"F1",speakerName:"Julie",speakerGender:"fem",utterance:"I am tired",sentence:"Julie (about herself):",question:"Is Julie certain that she is tired?"}, {list:"3",id:"control2",condition:"control",sound:"F2.wav",verb:"control",speaker:"F2",speakerName:"June",speakerGender:"fem",utterance:"I was invited to the party",sentence:"June (about herself):",question:"Is June certain that she was invited to the party?"}, {list:"3",id:"aware-3-P6",condition:"c",sound:"P6-A-3-c.wav",verb:"aware",speaker:"P6",speakerName:"Dana",speakerGender:"fem",utterance:"Perhaps she was aware that he had bad reviews",sentence:"Dana (about Joan and Lenny):",question:"Is Dana certain that Lenny had bad reviews?"}],
[{list:"4",id:"know-2-P11",condition:"c",sound:"P11-K-2-c.wav",verb:"know",speaker:"P11",speakerName:"Ethan",speakerGender:"masc",utterance:"Perhaps he knew that she was married",sentence:"Ethan (about Greg and Tara):",question:"Is Ethan certain that Tara was married?"}, {list:"4",id:"aware-1-P4",condition:"c",sound:"P4-A-1-c.wav",verb:"aware",speaker:"P4",speakerName:"Alexandra",speakerGender:"fem",utterance:"Perhaps she was aware that he was a terrible administrator",sentence:"Alexandra (about Selena and Scott):",question:"Is Alexandra certain that Scott was a terrible administrator?"}, {list:"4",id:"aware-2-P8",condition:"nc",sound:"P8-A-2-nc.wav",verb:"aware",speaker:"P8",speakerName:"Liam",speakerGender:"masc",utterance:"Perhaps she was aware that he was unreliable",sentence:"Liam (about Cassie and Bruce):",question:"Is Liam certain that Bruce was unreliable?"}, {list:"4",id:"notice-2-P12",condition:"nc",sound:"P12-N-2-nc.wav",verb:"notice",speaker:"P12",speakerName:"Lucas",speakerGender:"masc",utterance:"Perhaps she noticed that he had bad breath",sentence:"Lucas (about Sue and Mark):",question:"Is Lucas certain that Mark has bad breath?"}, {list:"4",id:"discover-2-P3",condition:"nc",sound:"P3-D-2-nc.wav",verb:"discover",speaker:"P3",speakerName:"Amelia",speakerGender:"fem",utterance:"Perhaps he discovered that he’s a father",sentence:"Amelia (about Simon):",question:"Is Amelia certain that Simon is a father?"}, {list:"4",id:"aware-3-P6",condition:"nc",sound:"P6-A-3-nc.wav",verb:"aware",speaker:"P6",speakerName:"Dana",speakerGender:"fem",utterance:"Perhaps she was aware that he had bad reviews",sentence:"Dana (about Joan and Lenny):",question:"Is Dana certain that Lenny had bad reviews?"}, {list:"4",id:"control2",condition:"control",sound:"F2.wav",verb:"control",speaker:"F2",speakerName:"June",speakerGender:"fem",utterance:"I was invited to the party",sentence:"June (about herself):",question:"Is June certain that she was invited to the party?"}, {list:"4",id:"control1",condition:"control",sound:"F1.wav",verb:"control",speaker:"F1",speakerName:"Julie",speakerGender:"fem",utterance:"I am tired",sentence:"Julie (about herself):",question:"Is Julie certain that she is tired?"}, {list:"4",id:"know-3-P9",condition:"c",sound:"P9-K-3-c.wav",verb:"know",speaker:"P9",speakerName:"Sophia",speakerGender:"fem",utterance:"Perhaps she knew that he was wrong",sentence:"Sophia (about Maggie and Toby):",question:"Is Sophia certain that Toby was wrong?"}],
[{list:"5",id:"aware-3-P14",condition:"c",sound:"P14-A-3-c.wav",verb:"aware",speaker:"P14",speakerName:"Patty",speakerGender:"fem",utterance:"Perhaps she was aware that he had bad reviews",sentence:"Patty (about Joan and Lenny):",question:"Is Patty certain that Lenny had bad reviews?"}, {list:"5",id:"notice-2-P4",condition:"c",sound:"P4-N-2-c.wav",verb:"notice",speaker:"P4",speakerName:"Alexandra",speakerGender:"fem",utterance:"Perhaps she noticed that he had bad breath",sentence:"Alexandra (about Sue and Mark):",question:"Is Alexandra certain that Mark has bad breath?"}, {list:"5",id:"aware-1-P12",condition:"nc",sound:"P12-A-1-nc.wav",verb:"aware",speaker:"P12",speakerName:"Lucas",speakerGender:"masc",utterance:"Perhaps she was aware that he was a terrible administrator",sentence:"Lucas (about Selena and Scott):",question:"Is Lucas certain that Scott was a terrible administrator?"}, {list:"5",id:"discover-2-P5",condition:"c",sound:"P5-D-2-c.wav",verb:"discover",speaker:"P5",speakerName:"Jesse",speakerGender:"masc",utterance:"Perhaps he discovered that he’s a father",sentence:"Jesse (about Simon):",question:"Is Jesse certain that Simon is a father?"}, {list:"5",id:"control2",condition:"control",sound:"F2.wav",verb:"control",speaker:"F2",speakerName:"June",speakerGender:"fem",utterance:"I was invited to the party",sentence:"June (about herself):",question:"Is June certain that she was invited to the party?"}, {list:"5",id:"aware-2-P3",condition:"c",sound:"P3-A-2-c.wav",verb:"aware",speaker:"P3",speakerName:"Amelia",speakerGender:"fem",utterance:"Perhaps she was aware that he was unreliable",sentence:"Amelia (about Cassie and Bruce):",question:"Is Amelia certain that Bruce was unreliable?"}, {list:"5",id:"control1",condition:"control",sound:"F1.wav",verb:"control",speaker:"F1",speakerName:"Julie",speakerGender:"fem",utterance:"I am tired",sentence:"Julie (about herself):",question:"Is Julie certain that she is tired?"}, {list:"5",id:"know-2-P8",condition:"nc",sound:"P8-K-2-nc.wav",verb:"know",speaker:"P8",speakerName:"Liam",speakerGender:"masc",utterance:"Perhaps he knew that she was married",sentence:"Liam (about Greg and Tara):",question:"Is Liam certain that Tara was married?"}, {list:"5",id:"know-3-P1",condition:"nc",sound:"P1-K-3-nc.wav",verb:"know",speaker:"P1",speakerName:"Amy",speakerGender:"fem",utterance:"Perhaps she knew that he was wrong",sentence:"Amy (about Maggie and Toby):",question:"Is Amy certain that Toby was wrong?"}],
[{list:"6",id:"discover-2-P5",condition:"nc",sound:"P5-D-2-nc.wav",verb:"discover",speaker:"P5",speakerName:"Jesse",speakerGender:"masc",utterance:"Perhaps he discovered that he’s a father",sentence:"Jesse (about Simon)",question:"Is Jesse certain that Simon is a father?"}, {list:"6",id:"aware-1-P12",condition:"c",sound:"P12-A-1-c.wav",verb:"aware",speaker:"P12",speakerName:"Lucas",speakerGender:"masc",utterance:"Perhaps she was aware that he was a terrible administrator",sentence:"Lucas (about Selena and Scott):",question:"Is Lucas certain that Scott was a terrible administrator?"}, {list:"6",id:"know-2-P8",condition:"c",sound:"P8-K-2-c.wav",verb:"know",speaker:"P8",speakerName:"Liam",speakerGender:"masc",utterance:"Perhaps he knew that she was married",sentence:"Liam (about Greg and Tara):",question:"Is Liam certain that Tara was married?"}, {list:"6",id:"aware-2-P3",condition:"nc",sound:"P3-A-2-nc.wav",verb:"aware",speaker:"P3",speakerName:"Amelia",speakerGender:"fem",utterance:"Perhaps she was aware that he was unreliable",sentence:"Amelia (about Cassie and Bruce):",question:"Is Amelia certain that Bruce was unreliable?"}, {list:"6",id:"notice-2-P4",condition:"nc",sound:"P4-N-2-nc.wav",verb:"notice",speaker:"P4",speakerName:"Alexandra",speakerGender:"fem",utterance:"Perhaps she noticed that he had bad breath",sentence:"Alexandra (about Sue and Mark):",question:"Is Alexandra certain that Mark has bad breath?"}, {list:"6",id:"know-3-P1",condition:"c",sound:"P1-K-3-c.wav",verb:"know",speaker:"P1",speakerName:"Amy",speakerGender:"fem",utterance:"Perhaps she knew that he was wrong",sentence:"Amy (about Maggie and Toby):",question:"Is Amy certain that Toby was wrong?"}, {list:"6",id:"aware-3-P14",condition:"nc",sound:"P14-A-3-nc.wav",verb:"aware",speaker:"P14",speakerName:"Patty",speakerGender:"fem",utterance:"Perhaps she was aware that he had bad reviews",sentence:"Patty (about Joan and Lenny):",question:"Is Patty certain that Lenny had bad reviews?"}, {list:"6",id:"control2",condition:"control",sound:"F2.wav",verb:"control",speaker:"F2",speakerName:"June",speakerGender:"fem",utterance:"I was invited to the party",sentence:"June (about herself):",question:"Is June certain that she was invited to the party?"}, {list:"6",id:"control1",condition:"control",sound:"F1.wav",verb:"control",speaker:"F1",speakerName:"Julie",speakerGender:"fem",utterance:"I am tired",sentence:"Julie (about herself):",question:"Is Julie certain that she is tired?"}],
[{list:"7",id:"aware-1-P3",condition:"nc",sound:"P3-A-1-nc.wav",verb:"aware",speaker:"P3",speakerName:"Amelia",speakerGender:"fem",utterance:"Perhaps she was aware that he was a terrible administrator",sentence:"Amelia (about Selena and Scott):",question:"Is Amelia certain that Scott was a terrible administrator?"}, {list:"7",id:"know-3-P12",condition:"nc",sound:"P12-K-3-nc.wav",verb:"know",speaker:"P12",speakerName:"Lucas",speakerGender:"masc",utterance:"Perhaps she knew that he was wrong",sentence:"Lucas (about Maggie and Toby):",question:"Is Lucas certain that Toby was wrong?"}, {list:"7",id:"control1",condition:"control",sound:"F1.wav",verb:"control",speaker:"F1",speakerName:"Julie",speakerGender:"fem",utterance:"I am tired",sentence:"Julie (about herself):",question:"Is Julie certain that she is tired?"}, {list:"7",id:"discover-2-P8",condition:"c",sound:"P8-D-2-c.wav",verb:"discover",speaker:"P8",speakerName:"Liam",speakerGender:"masc",utterance:"Perhaps he discovered that he’s a father",sentence:"Liam (about Simon):",question:"Is Liam certain that Simon is a father?"}, {list:"7",id:"control2",condition:"control",sound:"F2.wav",verb:"control",speaker:"F2",speakerName:"June",speakerGender:"fem",utterance:"I was invited to the party",sentence:"June (about herself):",question:"Is June certain that she was invited to the party?"}, {list:"7",id:"aware-2-P1",condition:"c",sound:"P1-A-2-c.wav",verb:"aware",speaker:"P1",speakerName:"Amy",speakerGender:"fem",utterance:"Perhaps she was aware that he was unreliable",sentence:"Amy (about Cassie and Bruce):",question:"Is Amy certain that Bruce was unreliable?"}, {list:"7",id:"know-2-P4",condition:"nc",sound:"P4-K-2-nc.wav",verb:"know",speaker:"P4",speakerName:"Alexandra",speakerGender:"fem",utterance:"Perhaps he knew that she was married",sentence:"Alexandra (about Greg and Tara):",question:"Is Alexandra certain that Tara was married?"}, {list:"7",id:"aware-3-P5",condition:"c",sound:"P5-A-3-c.wav",verb:"aware",speaker:"P5",speakerName:"Jesse",speakerGender:"masc",utterance:"Perhaps she was aware that he had bad reviews",sentence:"Jesse (about Joan and Lenny):",question:"Is Jesse certain that Lenny had bad reviews?"}, {list:"7",id:"notice-2-P6",condition:"c",sound:"P6-N-2-c.wav",verb:"notice",speaker:"P6",speakerName:"Dana",speakerGender:"fem",utterance:"Perhaps she noticed that he had bad breath",sentence:"Dana (about Sue and Mark):",question:"Is Dana certain that Mark has bad breath?"}],
[{list:"8",id:"aware-2-P1",condition:"nc",sound:"P1-A-2-nc.wav",verb:"aware",speaker:"P1",speakerName:"Amy",speakerGender:"fem",utterance:"Perhaps she was aware that he was unreliable",sentence:"Amy (about Cassie and Bruce):",question:"Is Amy certain that Bruce was unreliable?"}, {list:"8",id:"know-3-P12",condition:"c",sound:"P12-K-3-c.wav",verb:"know",speaker:"P12",speakerName:"Lucas",speakerGender:"masc",utterance:"Perhaps she knew that he was wrong",sentence:"Lucas (about Maggie and Toby):",question:"Is Lucas certain that Toby was wrong?"}, {list:"8",id:"notice-2-P6",condition:"nc",sound:"P6-N-2-nc.wav",verb:"notice",speaker:"P6",speakerName:"Dana",speakerGender:"fem",utterance:"Perhaps she noticed that he had bad breath",sentence:"Dana (about Sue and Mark):",question:"Is Dana certain that Mark has bad breath?"}, {list:"8",id:"discover-2-P8",condition:"nc",sound:"P8-D-2-nc.wav",verb:"discover",speaker:"P8",speakerName:"Liam",speakerGender:"masc",utterance:"Perhaps he discovered that he’s a father",sentence:"Liam (about Simon):",question:"Is Liam certain that Simon is a father?"}, {list:"8",id:"control1",condition:"control",sound:"F1.wav",verb:"control",speaker:"F1",speakerName:"Julie",speakerGender:"fem",utterance:"I am tired",sentence:"Julie (about herself):",question:"Is Julie certain that she is tired?"}, {list:"8",id:"aware-3-P5",condition:"nc",sound:"P5-A-3-nc.wav",verb:"aware",speaker:"P5",speakerName:"Jesse",speakerGender:"masc",utterance:"Perhaps she was aware that he had bad reviews",sentence:"Jesse (about Joan and Lenny):",question:"Is Jesse certain that Lenny had bad reviews?"}, {list:"8",id:"control2",condition:"control",sound:"F2.wav",verb:"control",speaker:"F2",speakerName:"June",speakerGender:"fem",utterance:"I was invited to the party",sentence:"June (about herself):",question:"Is June certain that she was invited to the party?"}, {list:"8",id:"know-2-P4",condition:"c",sound:"P4-K-2-c.wav",verb:"know",speaker:"P4",speakerName:"Alexandra",speakerGender:"fem",utterance:"Perhaps he knew that she was married",sentence:"Alexandra (about Greg and Tara):",question:"Is Alexandra certain that Tara was married?"}, {list:"8",id:"aware-1-P3",condition:"c",sound:"P3-A-1-c.wav",verb:"aware",speaker:"P3",speakerName:"Amelia",speakerGender:"fem",utterance:"Perhaps she was aware that he was a terrible administrator",sentence:"Amelia (about Selena and Scott):",question:"Is Amelia certain that Scott was a terrible administrator?"}]
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