// created by tonhauser in august 2014
  
//3 lists in this experiment
//0 is the first list, 2 is the last list (i.e. the 3rd)
var lists = [0,1];

//with 30 lists:
//var listNumber = shuffle(lists)[0];//Math.floor(Math.random() * 30);

var listNumber = shuffle(lists)[0]; //Math.floor(Math.random() * 24);

console.log(listNumber);

//var trials = 
//[
//[{stimulus1},{stimulus2},{stimulus3},...] trial1
//[{stimulus1},{stimulus2},{stimulus3},...] trial2 
//][listNumber];

var trials = [ 
[{list:"1",id:"realize-1",prosody:"H-Pred",sound:"R1sa-V.wav",verb:"realize",utterance:"Perhaps he realized that she\'s wealthy",sentence:"<b>Anna (about Ivan and Sandra)</b>: ",question:"Is Anna certain that Sandra is wealthy?"}, {list:"1",id:"discover-3",prosody:"LH-Cont-CC",sound:"D3sa-C.wav",verb:"discover",utterance:"Perhaps she discovered that he\'s Canadian",sentence:"<b>Alexandra (about Maggie and Todd)</b>: ",question:"Is Alexandra certain that Todd is Canadian?"}, {list:"1",id:"discover-2",prosody:"H-Pred",sound:"D2sa-V.wav",verb:"discover",utterance:"Perhaps she discovered that he\'s a father",sentence:"<b>Beatrice (about Cassie and Bruce)</b>: ",question:"Is Beatrice certain that Bruce is a father?"}, {list:"1",id:"filler1",prosody:"F",sound:"F1.wav",verb:"filler",utterance:"I am tired",sentence:"<b>Cindy</b>:",question:"Is Cindy certain that she is tired?"}, {list:"1",id:"aware-1",prosody:"H-Pred",sound:"A1sa-V.wav",verb:"aware",utterance:"Perhaps she was aware that he\'s a vegetarian",sentence:"<b>Joyce (about Sue and Mark)</b>: ",question:"Is Joyce certain that Mark is a vegetarian?"}, {list:"1",id:"notice-3",prosody:"LH-Cont-CC",sound:"N3sa-C.wav",verb:"notice",utterance:"Perhaps he noticed that she was hungry ",sentence:"<b>Trisha (about Victor and Natalie)</b>:",question:"Is Trisha certain that Natalie was hungry?"}, {list:"1",id:"realize-3",prosody:"H-Pred",sound:"R3sa-V.wav",verb:"realize",utterance:"Perhaps he realized that she was cheating on him",sentence:"<b>Kathryn (about Bruce and Marie)</b>:",question:"Is Kathryn certain that Marie was cheating on Bruce?"}, {list:"1",id:"aware-2",prosody:"LH-Cont-CC",sound:"A2sa-C.wav",verb:"aware",utterance:"Perhaps she was aware that he was unreliable",sentence:"<b>Patty (about Joyce and Carl)</b>: ",question:"Is Patty certain that Carl was unreliable?"}, {list:"1",id:"notice-1",prosody:"LH-Cont-CC",sound:"N1sa-C.wav",verb:"notice",utterance:"Perhaps he noticed that she was missing something ",sentence:"<b>Isabel (about Jasper and Katie)</b>: ",question:"Is Isabel certain that Katie was missing something?"}, {list:"1",id:"know-2",prosody:"LH-Cont-CC",sound:"K2sa-C.wav",verb:"know",utterance:"Perhaps he knew that she was married",sentence:"<b>Zoe (about Marcus and Danielle)</b>: ",question:"Is Zoe certain that Danielle was married?"}, {list:"1",id:"aware-3",prosody:"H-Pred",sound:"A3sa-V.wav",verb:"aware",utterance:"Perhaps she was aware that he had bad reviews",sentence:"<b>Tina (about Ida and Sam)</b>: ",question:"Is Tina certain that Sam had bad reviews?"}, {list:"1",id:"realize-2",prosody:"LH-Cont-CC",sound:"R2sa-C.wav",verb:"realize",utterance:"Perhaps she realized that he had a virus",sentence:"<b>Doris (about Miriam and Peter)</b>: ",question:"Is Doris certain that Peter had a virus?"}, {list:"1",id:"know-1",prosody:"H-Pred",sound:"K1sa-V.wav",verb:"know",utterance:"Perhaps she knew that he was a criminal",sentence:"<b>June (about Vicky and Frank)</b>: ",question:"Is June certain that Frank was a criminal?"}, {list:"1",id:"discover-1",prosody:"LH-Cont-CC",sound:"D1sa-C.wav",verb:"discover",utterance:"Perhaps he discovered that she\'s a widow",sentence:"<b>Dana (about Scott and Valeria)</b>: ",question:"Is Dana certain that Valeria is a widow?"}, {list:"1",id:"know-3",prosody:"H-Pred",sound:"K3sa-V.wav",verb:"know",utterance:"Perhaps she knew that he was wrong",sentence:"<b>Nicole (about Claire and George)</b>:",question:"Is Nicole certain that George was wrong?"}, {list:"1",id:"filler2",prosody:"F",sound:"F2.wav",verb:"filler",utterance:"I was invited to the party",sentence:"<b>Julie</b>: ",question:"Is Julie certain that she was invited to the party?"}, {list:"1",id:"notice-2",prosody:"H-Pred",sound:"N2sa-V.wav",verb:"notice",utterance:"Perhaps she noticed that he had bad breath",sentence:"<b>Eloise (about Eva and Michael)</b>: ",question:"Is Eloise certain that Michael had bad breath?"}],
[{list:"2",id:"filler1",prosody:"F",sound:"F1.wav",verb:"filler",utterance:"I am tired",sentence:"<b>Cindy</b>:",question:"Is Cindy certain that she is tired?"}, {list:"2",id:"know-1",prosody:"LH-Cont-CC",sound:"K1sa-C.wav",verb:"know",utterance:"Perhaps she knew that he was a criminal",sentence:"<b>June (about Vicky and Frank)</b>: ",question:"Is June certain that Frank was a criminal?"}, {list:"2",id:"know-3",prosody:"LH-Cont-CC",sound:"K3sa-C.wav",verb:"know",utterance:"Perhaps she knew that he was wrong",sentence:"<b>Nicole (about Claire and George)</b>:",question:"Is Nicole certain that George was wrong?"}, {list:"2",id:"realize-3",prosody:"LH-Cont-CC",sound:"R3sa-C.wav",verb:"realize",utterance:"Perhaps he realized that she was cheating on him",sentence:"<b>Kathryn (about Bruce and Marie)</b>:",question:"Is Kathryn certain that Marie was cheating on Bruce?"}, {list:"2",id:"filler2",prosody:"F",sound:"F2.wav",verb:"filler",utterance:"I was invited to the party",sentence:"<b>Julie</b>: ",question:"Is Julie certain that she was invited to the party?"}, {list:"2",id:"realize-1",prosody:"LH-Cont-CC",sound:"R1sa-C.wav",verb:"realize",utterance:"Perhaps he realized that she\'s wealthy",sentence:"<b>Anna (about Ivan and Sandra)</b>: ",question:"Is Anna certain that Sandra is wealthy?"}, {list:"2",id:"discover-2",prosody:"LH-Cont-CC",sound:"D2sa-C.wav",verb:"discover",utterance:"Perhaps she discovered that he\'s a father",sentence:"<b>Beatrice (about Cassie and Bruce)</b>: ",question:"Is Beatrice certain that Bruce is a father?"}, {list:"2",id:"know-2",prosody:"H-Pred",sound:"K2sa-V.wav",verb:"know",utterance:"Perhaps he knew that she was married",sentence:"<b>Zoe (about Marcus and Danielle)</b>: ",question:"Is Zoe certain that Danielle was married?"}, {list:"2",id:"notice-1",prosody:"H-Pred",sound:"N1sa-V.wav",verb:"notice",utterance:"Perhaps he noticed that she was missing something ",sentence:"<b>Isabel (about Jasper and Katie)</b>: ",question:"Is Isabel certain that Katie was missing something?"}, {list:"2",id:"aware-1",prosody:"LH-Cont-CC",sound:"A1sa-C.wav",verb:"aware",utterance:"Perhaps she was aware that he\'s a vegetarian",sentence:"<b>Joyce (about Sue and Mark)</b>: ",question:"Is Joyce certain that Mark is a vegetarian?"}, {list:"2",id:"aware-3",prosody:"LH-Cont-CC",sound:"A3sa-C.wav",verb:"aware",utterance:"Perhaps she was aware that he had bad reviews",sentence:"<b>Tina (about Ida and Sam)</b>: ",question:"Is Tina certain that Sam had bad reviews?"}, {list:"2",id:"realize-2",prosody:"H-Pred",sound:"R2sa-V.wav",verb:"realize",utterance:"Perhaps she realized that he had a virus",sentence:"<b>Doris (about Miriam and Peter)</b>: ",question:"Is Doris certain that Peter had a virus?"}, {list:"2",id:"notice-2",prosody:"LH-Cont-CC",sound:"N2sa-C.wav",verb:"notice",utterance:"Perhaps she noticed that he had bad breath",sentence:"<b>Eloise (about Eva and Michael)</b>: ",question:"Is Eloise certain that Michael had bad breath?"}, {list:"2",id:"discover-3",prosody:"H-Pred",sound:"D3sa-V.wav",verb:"discover",utterance:"Perhaps she discovered that he\'s Canadian",sentence:"<b>Alexandra (about Maggie and Todd)</b>: ",question:"Is Alexandra certain that Todd is Canadian?"}, {list:"2",id:"notice-3",prosody:"H-Pred",sound:"N3sa-V.wav",verb:"notice",utterance:"Perhaps he noticed that she was hungry ",sentence:"<b>Trisha (about Victor and Natalie)</b>:",question:"Is Trisha certain that Natalie was hungry?"}, {list:"2",id:"discover-1",prosody:"H-Pred",sound:"D1sa-V.wav",verb:"discover",utterance:"Perhaps he discovered that she\'s a widow",sentence:"<b>Dana (about Scott and Valeria)</b>: ",question:"Is Dana certain that Valeria is a widow?"}, {list:"2",id:"aware-2",prosody:"H-Pred",sound:"A2sa-V.wav",verb:"aware",utterance:"Perhaps she was aware that he was unreliable",sentence:"<b>Patty (about Joyce and Carl)</b>: ",question:"Is Patty certain that Carl was unreliable?"}]
][listNumber];

trials = shuffle(trials);

console.log(trials);

var tcounter = 0; // experimental trial counter
var trialnum = 0; // progress bar trial counter

var nSlides = 1+1+trials.length+1; // instructions slide plus 1 slide for each question plus questionnaire

//////// some useful functions /////////////

function caps(a) {return a.substring(0,1).toUpperCase() + a.substring(1,a.length);}
function lower(a) {return a.substring(0,1).toLowerCase() + a.substring(1,a.length);}
function showSlide(id) { $(".slide").hide(); $("#"+id).show(); }
function shuffle(v) { newarray = v.slice(0);for(var j, x, i = newarray.length; i; j = parseInt(Math.random() * i), x = newarray[--i], newarray[i] = newarray[j], newarray[j] = x);return newarray;} // non-destructive.
function fillArray(value, len) {
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(value);
  };
  return arr;
}
function uniform(a, b) { return ( (Math.random()*(b-a))+a ); }

  
// start experiment
$(document).ready(function() {
  showSlide("consent");
//	experiment.questionaire();
//  experiment.context3();
  $("#mustaccept").hide();
});

slides.auth = slide({
  	name : "auth",
  });
  
  
// experiment specification - this is where it really starts
var experiment = {
  data: {
         windowWidth:window.innerWidth,
         windowHeight:window.innerHeight,
         browser:BrowserDetect.browser,
	 trials:trials,
	 listNumber:listNumber,
	 responses:[]		 
  },     
    
         
  instructions: function() {
    if (turk.previewMode) {
      $("#instructions #mustaccept").show();
    } else {
	trialnum ++;      	
      showSlide("instructions");    
    	$('.bar').css('width', ( (100/nSlides) + "%")); 
      	$("#begin").click(function() { experiment.comprehensiontrial(tcounter); })
    }
  },
  
  comprehensiontrial: function(tcounter) {
	//	console.log(trials[tcounter]);
  	trialnum++;
    $('.bar').css('width', ( (100*(trialnum)/nSlides) + "%"));
    $(".err").hide();
    showSlide("comprehensiontrial");
    var response = [];
    var nResponses = 0;
    //On each slide: sentence, question 
    // <audio controls>  <source src="test.wav" type="audio/wav"> Your browser does not support the audio element. </audio>
	var text = "<font size=4>"+trials[tcounter].sentence+"</font> <br><br> <audio controls source src=stimuli/"+trials[tcounter].sound+" type=&quot;audio/wav&quot; >bla</audio>" 
	//var utterance = "<table><tr><td width=600px><font size=4>"+trials[tcounter].sentence+"</font></td></tr</table>" 
	$(".sentence").html(text);
    //$(".sentence").html(""+trials[tcounter].sentence+"");
	$(".question").html(""+trials[tcounter].question+"");	
	var radioresponses = "<th width='80px'><input type='radio' name='radioresponse' value='1'/></th><th width='80px''><input type='radio' name='radioresponse' value='2'/></th><th width='80px'><input type='radio' name='radioresponse' value='3'/></th><th width='80px'><input type='radio' name='radioresponse' value='4'/></th><th width='80px'><input type='radio' name='radioresponse' value='5'/></th><th width='80px'><input type='radio' name='radioresponse' value='6'/></th><th width='80px'><input type='radio' name='radioresponse' value='7'/></th>";
	var radiolabels = "<th width='80px'><span>No, not certain</span></th><th width='80px'><span></span></th><th width='80px'><span>Possibly not certain</span></th><th width='80px''></th><th width='80px'>Possibly certain</th><th width='80px'></th><th width='80px'>Yes, certain</th>";
    $(".radioResponses").html(radioresponses);	
    $(".radioLabels").html(radiolabels);	
    
    // only proceed if a response was given
    $(".compcontinue").click(function() {
      if($("input[name='radioresponse']:checked").val())
      {
	  //console.log($("input[name='radioresponse']:checked").val());
     	experiment.data["responses"].push($("input[name='radioresponse']:checked").val());
       $(".compcontinue").unbind("click");
       if (tcounter+1 < trials.length) {
			tcounter++;
            experiment.comprehensiontrial(tcounter);
       } else {       
       experiment.questionaire();
       }          
      } else 
      {
       $(".err").show();
     }
    });        
  },
    
 
  questionaire: function() {
	trialnum ++;  	
    $(document).keypress( function(event){
     if (event.which == '13') {
        event.preventDefault();
      }
    });
    $('.bar').css('width', ( "100%"));
    showSlide("questionaire");
    $("#lgerror").hide();
    $("#formsubmit").click(function(){
    rawResponse = $("#questionaireform").serialize();
    pieces = rawResponse.split("&");
    //console.log(pieces);
    var age = pieces[0].split("=")[1];
    var gender = pieces[1].split("=")[1];    
    var lang = pieces[2].split("=")[1];
    var americanenglish = pieces[3].split("=")[1];
    var comments = pieces[4].split("=")[1];
        
    if ((age.length > 0) && (gender.length > 0) && (lang.length > 0) && (americanenglish.length > 0)) {
        experiment.data["age"] = age;
        experiment.data["gender"] = gender;
        experiment.data["language"] = lang;
        experiment.data["americanenglish"] = americanenglish;        
        experiment.data["comments"] = comments;
        //experiment.data["age"] = age;
        showSlide("finished");
        setTimeout(function() { turk.submit(experiment.data) }, 1000);
    }
    });
  }
};