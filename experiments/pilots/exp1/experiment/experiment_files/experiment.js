// created by tonhauser in august 2014
  
//3 lists in this experiment
//0 is the first list, 2 is the last list (i.e. the 3rd)
var lists = [0,1,2,3,4,5,6,7];

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
[{list:"1",id:"know-2-P14",condition:"nc",sound:"P14-K-2-nc.wav",verb:"know",speaker:"P14",speakerName:"Patty",speakerGender:"fem",utterance:"Perhaps he knew that she was married",sentence:"Patty (about Greg and Tara):",question:"Is Patty certain that Tara was married?"}, {list:"1",id:"notice-2-P1",condition:"c",sound:"P1-N-2-c.wav",verb:"notice",speaker:"P1",speakerName:"Amy",speakerGender:"fem",utterance:"Perhaps she noticed that he had bad breath",sentence:"Amy (about Sue and Mark):",question:"Is Amy certain that Mark has bad breath?"}, {list:"1",id:"aware-1-P6",condition:"nc",sound:"P6-A-1-nc.wav",verb:"aware",speaker:"P6",speakerName:"Dana",speakerGender:"fem",utterance:"Perhaps she was aware that he was a terrible administrator",sentence:"Dana (about Selena and Scott):",question:"Is Dana certain that Scott was a terrible administrator?"}, {list:"1",id:"discover-2-P12",condition:"c",sound:"P12-D-2-c.wav",verb:"discover",speaker:"P12",speakerName:"Lucas",speakerGender:"masc",utterance:"Perhaps he discovered that he’s a father",sentence:"Lucas (about Simon):",question:"Is Lucas certain that Simon is a father?"}, {list:"1",id:"control2",condition:"control",sound:"F2.wav",verb:"control",speaker:"F2",speakerName:"June",speakerGender:"fem",utterance:"I was invited to the party",sentence:"June (about herself):",question:"Is June certain that she was invited to the party?"}, {list:"1",id:"aware-3-P8",condition:"c",sound:"P8-A-3-c.wav",verb:"aware",speaker:"P8",speakerName:"Liam",speakerGender:"masc",utterance:"Perhaps she was aware that he had bad reviews",sentence:"Liam (about Joan and Lenny):",question:"Is Liam certain that Lenny had bad reviews?"}, {list:"1",id:"know-3-P4",condition:"nc",sound:"P4-K-3-nc.wav",verb:"know",speaker:"P4",speakerName:"Alexandra",speakerGender:"fem",utterance:"Perhaps she knew that he was wrong",sentence:"Alexandra (about Maggie and Toby):",question:"Is Alexandra certain that Toby was wrong?"}, {list:"1",id:"aware-2-P11",condition:"c",sound:"P11-A-2-c.wav",verb:"aware",speaker:"P11",speakerName:"Ethan",speakerGender:"masc",utterance:"Perhaps she was aware that he was unreliable",sentence:"Ethan (about Cassie and Bruce):",question:"Is Ethan certain that Bruce was unreliable?"}, {list:"1",id:"control1",condition:"control",sound:"F1.wav",verb:"control",speaker:"F1",speakerName:"Julie",speakerGender:"fem",utterance:"I am tired",sentence:"Julie (about herself):",question:"Is Julie certain that she is tired?"}],
[{list:"2",id:"notice-2-P1",condition:"nc",sound:"P1-N-2-nc.wav",verb:"notice",speaker:"P1",speakerName:"Amy",speakerGender:"fem",utterance:"Perhaps she noticed that he had bad breath",sentence:"Amy (about Sue and Mark):",question:"Is Amy certain that Mark has bad breath?"}, {list:"2",id:"aware-1-P6",condition:"c",sound:"P6-A-1-c.wav",verb:"aware",speaker:"P6",speakerName:"Dana",speakerGender:"fem",utterance:"Perhaps she was aware that he was a terrible administrator",sentence:"Dana (about Selena and Scott):",question:"Is Dana certain that Scott was a terrible administrator?"}, {list:"2",id:"control1",condition:"control",sound:"F1.wav",verb:"control",speaker:"F1",speakerName:"Julie",speakerGender:"fem",utterance:"I am tired",sentence:"Julie (about herself):",question:"Is Julie certain that she is tired?"}, {list:"2",id:"aware-2-P11",condition:"nc",sound:"P11-A-2-nc.wav",verb:"aware",speaker:"P11",speakerName:"Ethan",speakerGender:"masc",utterance:"Perhaps she was aware that he was unreliable",sentence:"Ethan (about Cassie and Bruce):",question:"Is Ethan certain that Bruce was unreliable?"}, {list:"2",id:"discover-2-P12",condition:"nc",sound:"P12-D-2-nc.wav",verb:"discover",speaker:"P12",speakerName:"Lucas",speakerGender:"masc",utterance:"Perhaps he discovered that he’s a father",sentence:"Lucas (about Simon):",question:"Is Lucas certain that Simon is a father?"}, {list:"2",id:"know-3-P4",condition:"c",sound:"P4-K-3-c.wav",verb:"know",speaker:"P4",speakerName:"Alexandra",speakerGender:"fem",utterance:"Perhaps she knew that he was wrong",sentence:"Alexandra (about Maggie and Toby):",question:"Is Alexandra certain that Toby was wrong?"}, {list:"2",id:"control2",condition:"control",sound:"F2.wav",verb:"control",speaker:"F2",speakerName:"June",speakerGender:"fem",utterance:"I was invited to the party",sentence:"June (about herself):",question:"Is June certain that she was invited to the party?"}, {list:"2",id:"know-2-P14",condition:"c",sound:"P14-K-2-c.wav",verb:"know",speaker:"P14",speakerName:"Patty",speakerGender:"fem",utterance:"Perhaps he knew that she was married",sentence:"Patty (about Greg and Tara):",question:"Is Patty certain that Tara was married?"}, {list:"2",id:"aware-3-P8",condition:"nc",sound:"P8-A-3-nc.wav",verb:"aware",speaker:"P8",speakerName:"Liam",speakerGender:"masc",utterance:"Perhaps she was aware that he had bad reviews",sentence:"Liam (about Joan and Lenny):",question:"Is Liam certain that Lenny had bad reviews?"}],
[{list:"3",id:"know-2-P11",condition:"nc",sound:"P11-K-2-nc.wav",verb:"know",speaker:"P11",speakerName:"Ethan",speakerGender:"masc",utterance:"Perhaps he knew that she was married",sentence:"Ethan (about Greg and Tara):",question:"Is Ethan certain that Tara was married?"}, {list:"3",id:"discover-2-P3",condition:"c",sound:"P3-D-2-c.wav",verb:"discover",speaker:"P3",speakerName:"Amelia",speakerGender:"fem",utterance:"Perhaps he discovered that he’s a father",sentence:"Amelia (about Simon):",question:"Is Amelia certain that Simon is a father?"}, {list:"3",id:"control2",condition:"control",sound:"F2.wav",verb:"control",speaker:"F2",speakerName:"June",speakerGender:"fem",utterance:"I was invited to the party",sentence:"June (about herself):",question:"Is June certain that she was invited to the party?"}, {list:"3",id:"aware-1-P4",condition:"nc",sound:"P4-A-1-nc.wav",verb:"aware",speaker:"P4",speakerName:"Alexandra",speakerGender:"fem",utterance:"Perhaps she was aware that he was a terrible administrator",sentence:"Alexandra (about Selena and Scott):",question:"Is Alexandra certain that Scott was a terrible administrator?"}, {list:"3",id:"aware-3-P6",condition:"c",sound:"P6-A-3-c.wav",verb:"aware",speaker:"P6",speakerName:"Dana",speakerGender:"fem",utterance:"Perhaps she was aware that he had bad reviews",sentence:"Dana (about Joan and Lenny):",question:"Is Dana certain that Lenny had bad reviews?"}, {list:"3",id:"aware-2-P8",condition:"c",sound:"P8-A-2-c.wav",verb:"aware",speaker:"P8",speakerName:"Liam",speakerGender:"masc",utterance:"Perhaps she was aware that he was unreliable",sentence:"Liam (about Cassie and Bruce):",question:"Is Liam certain that Bruce was unreliable?"}, {list:"3",id:"know-3-P9",condition:"nc",sound:"P9-K-3-nc.wav",verb:"know",speaker:"P9",speakerName:"Sophia",speakerGender:"fem",utterance:"Perhaps she knew that he was wrong",sentence:"Sophia (about Maggie and Toby):",question:"Is Sophia certain that Toby was wrong?"}, {list:"3",id:"notice-2-P12",condition:"c",sound:"P12-N-2-c.wav",verb:"notice",speaker:"P12",speakerName:"Lucas",speakerGender:"masc",utterance:"Perhaps she noticed that he had bad breath",sentence:"Lucas (about Sue and Mark):",question:"Is Lucas certain that Mark has bad breath?"}, {list:"3",id:"control1",condition:"control",sound:"F1.wav",verb:"control",speaker:"F1",speakerName:"Julie",speakerGender:"fem",utterance:"I am tired",sentence:"Julie (about herself):",question:"Is Julie certain that she is tired?"}],
[{list:"4",id:"notice-2-P12",condition:"nc",sound:"P12-N-2-nc.wav",verb:"notice",speaker:"P12",speakerName:"Lucas",speakerGender:"masc",utterance:"Perhaps she noticed that he had bad breath",sentence:"Lucas (about Sue and Mark):",question:"Is Lucas certain that Mark has bad breath?"}, {list:"4",id:"discover-2-P3",condition:"nc",sound:"P3-D-2-nc.wav",verb:"discover",speaker:"P3",speakerName:"Amelia",speakerGender:"fem",utterance:"Perhaps he discovered that he’s a father",sentence:"Amelia (about Simon):",question:"Is Amelia certain that Simon is a father?"}, {list:"4",id:"aware-3-P6",condition:"nc",sound:"P6-A-3-nc.wav",verb:"aware",speaker:"P6",speakerName:"Dana",speakerGender:"fem",utterance:"Perhaps she was aware that he had bad reviews",sentence:"Dana (about Joan and Lenny):",question:"Is Dana certain that Lenny had bad reviews?"}, {list:"4",id:"aware-1-P4",condition:"c",sound:"P4-A-1-c.wav",verb:"aware",speaker:"P4",speakerName:"Alexandra",speakerGender:"fem",utterance:"Perhaps she was aware that he was a terrible administrator",sentence:"Alexandra (about Selena and Scott):",question:"Is Alexandra certain that Scott was a terrible administrator?"}, {list:"4",id:"control2",condition:"control",sound:"F2.wav",verb:"control",speaker:"F2",speakerName:"June",speakerGender:"fem",utterance:"I was invited to the party",sentence:"June (about herself):",question:"Is June certain that she was invited to the party?"}, {list:"4",id:"know-2-P11",condition:"c",sound:"P11-K-2-c.wav",verb:"know",speaker:"P11",speakerName:"Ethan",speakerGender:"masc",utterance:"Perhaps he knew that she was married",sentence:"Ethan (about Greg and Tara):",question:"Is Ethan certain that Tara was married?"}, {list:"4",id:"control1",condition:"control",sound:"F1.wav",verb:"control",speaker:"F1",speakerName:"Julie",speakerGender:"fem",utterance:"I am tired",sentence:"Julie (about herself):",question:"Is Julie certain that she is tired?"}, {list:"4",id:"aware-2-P8",condition:"nc",sound:"P8-A-2-nc.wav",verb:"aware",speaker:"P8",speakerName:"Liam",speakerGender:"masc",utterance:"Perhaps she was aware that he was unreliable",sentence:"Liam (about Cassie and Bruce):",question:"Is Liam certain that Bruce was unreliable?"}, {list:"4",id:"know-3-P9",condition:"c",sound:"P9-K-3-c.wav",verb:"know",speaker:"P9",speakerName:"Sophia",speakerGender:"fem",utterance:"Perhaps she knew that he was wrong",sentence:"Sophia (about Maggie and Toby):",question:"Is Sophia certain that Toby was wrong?"}],
[{list:"5",id:"control2",condition:"control",sound:"F2.wav",verb:"control",speaker:"F2",speakerName:"June",speakerGender:"fem",utterance:"I was invited to the party",sentence:"June (about herself):",question:"Is June certain that she was invited to the party?"}, {list:"5",id:"control1",condition:"control",sound:"F1.wav",verb:"control",speaker:"F1",speakerName:"Julie",speakerGender:"fem",utterance:"I am tired",sentence:"Julie (about herself):",question:"Is Julie certain that she is tired?"}, {list:"5",id:"know-3-P1",condition:"nc",sound:"P1-K-3-nc.wav",verb:"know",speaker:"P1",speakerName:"Amy",speakerGender:"fem",utterance:"Perhaps she knew that he was wrong",sentence:"Amy (about Maggie and Toby):",question:"Is Amy certain that Toby was wrong?"}, {list:"5",id:"aware-1-P12",condition:"nc",sound:"P12-A-1-nc.wav",verb:"aware",speaker:"P12",speakerName:"Lucas",speakerGender:"masc",utterance:"Perhaps she was aware that he was a terrible administrator",sentence:"Lucas (about Selena and Scott):",question:"Is Lucas certain that Scott was a terrible administrator?"}, {list:"5",id:"aware-3-P14",condition:"c",sound:"P14-A-3-c.wav",verb:"aware",speaker:"P14",speakerName:"Patty",speakerGender:"fem",utterance:"Perhaps she was aware that he had bad reviews",sentence:"Patty (about Joan and Lenny):",question:"Is Patty certain that Lenny had bad reviews?"}, {list:"5",id:"notice-2-P11",condition:"c",sound:"P11-N-2-c.wav",verb:"notice",speaker:"P11",speakerName:"Ethan",speakerGender:"masc",utterance:"Perhaps she noticed that he had bad breath",sentence:"Ethan (about Sue and Mark):",question:"Is Ethan certain that Mark has bad breath?"}, {list:"5",id:"aware-2-P3",condition:"c",sound:"P3-A-2-c.wav",verb:"aware",speaker:"P3",speakerName:"Amelia",speakerGender:"fem",utterance:"Perhaps she was aware that he was unreliable",sentence:"Amelia (about Cassie and Bruce):",question:"Is Amelia certain that Bruce was unreliable?"}, {list:"5",id:"know-2-P8",condition:"nc",sound:"P8-K-2-nc.wav",verb:"know",speaker:"P8",speakerName:"Liam",speakerGender:"masc",utterance:"Perhaps he knew that she was married",sentence:"Liam (about Greg and Tara):",question:"Is Liam certain that Tara was married?"}, {list:"5",id:"discover-2-P5",condition:"c",sound:"P5-D-2-c.wav",verb:"discover",speaker:"P5",speakerName:"Brian",speakerGender:"masc",utterance:"Perhaps he discovered that he’s a father",sentence:"Brian (about Simon):",question:"Is Brian certain that Simon is a father?"}],
[{list:"6",id:"control2",condition:"control",sound:"F2.wav",verb:"control",speaker:"F2",speakerName:"June",speakerGender:"fem",utterance:"I was invited to the party",sentence:"June (about herself):",question:"Is June certain that she was invited to the party?"}, {list:"6",id:"aware-1-P12",condition:"c",sound:"P12-A-1-c.wav",verb:"aware",speaker:"P12",speakerName:"Lucas",speakerGender:"masc",utterance:"Perhaps she was aware that he was a terrible administrator",sentence:"Lucas (about Selena and Scott):",question:"Is Lucas certain that Scott was a terrible administrator?"}, {list:"6",id:"discover-2-P5",condition:"nc",sound:"P5-D-2-nc.wav",verb:"discover",speaker:"P5",speakerName:"Brian",speakerGender:"masc",utterance:"Perhaps he discovered that he’s a father",sentence:"Brian (about Simon)",question:"Is Brian certain that Simon is a father?"}, {list:"6",id:"know-2-P8",condition:"c",sound:"P8-K-2-c.wav",verb:"know",speaker:"P8",speakerName:"Liam",speakerGender:"masc",utterance:"Perhaps he knew that she was married",sentence:"Liam (about Greg and Tara):",question:"Is Liam certain that Tara was married?"}, {list:"6",id:"know-3-P1",condition:"c",sound:"P1-K-3-c.wav",verb:"know",speaker:"P1",speakerName:"Amy",speakerGender:"fem",utterance:"Perhaps she knew that he was wrong",sentence:"Amy (about Maggie and Toby):",question:"Is Amy certain that Toby was wrong?"}, {list:"6",id:"control1",condition:"control",sound:"F1.wav",verb:"control",speaker:"F1",speakerName:"Julie",speakerGender:"fem",utterance:"I am tired",sentence:"Julie (about herself):",question:"Is Julie certain that she is tired?"}, {list:"6",id:"aware-2-P3",condition:"nc",sound:"P3-A-2-nc.wav",verb:"aware",speaker:"P3",speakerName:"Amelia",speakerGender:"fem",utterance:"Perhaps she was aware that he was unreliable",sentence:"Amelia (about Cassie and Bruce):",question:"Is Amelia certain that Bruce was unreliable?"}, {list:"6",id:"aware-3-P14",condition:"nc",sound:"P14-A-3-nc.wav",verb:"aware",speaker:"P14",speakerName:"Patty",speakerGender:"fem",utterance:"Perhaps she was aware that he had bad reviews",sentence:"Patty (about Joan and Lenny):",question:"Is Patty certain that Lenny had bad reviews?"}, {list:"6",id:"notice-2-P11",condition:"nc",sound:"P11-N-2-nc.wav",verb:"notice",speaker:"P11",speakerName:"Ethan",speakerGender:"masc",utterance:"Perhaps she noticed that he had bad breath",sentence:"Ethan (about Sue and Mark):",question:"Is Ethan certain that Mark has bad breath?"}],
[{list:"7",id:"aware-2-P1",condition:"c",sound:"P1-A-2-c.wav",verb:"aware",speaker:"P1",speakerName:"Amy",speakerGender:"fem",utterance:"Perhaps she was aware that he was unreliable",sentence:"Amy (about Cassie and Bruce):",question:"Is Amy certain that Bruce was unreliable?"}, {list:"7",id:"aware-3-P5",condition:"c",sound:"P5-A-3-c.wav",verb:"aware",speaker:"P5",speakerName:"Brian",speakerGender:"masc",utterance:"Perhaps she was aware that he had bad reviews",sentence:"Brian (about Joan and Lenny):",question:"Is Brian certain that Lenny had bad reviews?"}, {list:"7",id:"notice-2-P6",condition:"c",sound:"P6-N-2-c.wav",verb:"notice",speaker:"P6",speakerName:"Dana",speakerGender:"fem",utterance:"Perhaps she noticed that he had bad breath",sentence:"Dana (about Sue and Mark):",question:"Is Dana certain that Mark has bad breath?"}, {list:"7",id:"know-3-P12",condition:"nc",sound:"P12-K-3-nc.wav",verb:"know",speaker:"P12",speakerName:"Lucas",speakerGender:"masc",utterance:"Perhaps she knew that he was wrong",sentence:"Lucas (about Maggie and Toby):",question:"Is Lucas certain that Toby was wrong?"}, {list:"7",id:"aware-1-P3",condition:"nc",sound:"P3-A-1-nc.wav",verb:"aware",speaker:"P3",speakerName:"Amelia",speakerGender:"fem",utterance:"Perhaps she was aware that he was a terrible administrator",sentence:"Amelia (about Selena and Scott):",question:"Is Amelia certain that Scott was a terrible administrator?"}, {list:"7",id:"control1",condition:"control",sound:"F1.wav",verb:"control",speaker:"F1",speakerName:"Julie",speakerGender:"fem",utterance:"I am tired",sentence:"Julie (about herself):",question:"Is Julie certain that she is tired?"}, {list:"7",id:"control2",condition:"control",sound:"F2.wav",verb:"control",speaker:"F2",speakerName:"June",speakerGender:"fem",utterance:"I was invited to the party",sentence:"June (about herself):",question:"Is June certain that she was invited to the party?"}, {list:"7",id:"discover-2-P8",condition:"c",sound:"P8-D-2-c.wav",verb:"discover",speaker:"P8",speakerName:"Liam",speakerGender:"masc",utterance:"Perhaps he discovered that he’s a father",sentence:"Liam (about Simon):",question:"Is Liam certain that Simon is a father?"}, {list:"7",id:"know-2-P4",condition:"nc",sound:"P4-K-2-nc.wav",verb:"know",speaker:"P4",speakerName:"Alexandra",speakerGender:"fem",utterance:"Perhaps he knew that she was married",sentence:"Alexandra (about Greg and Tara):",question:"Is Alexandra certain that Tara was married?"}],
[{list:"8",id:"aware-3-P5",condition:"nc",sound:"P5-A-3-nc.wav",verb:"aware",speaker:"P5",speakerName:"Brian",speakerGender:"masc",utterance:"Perhaps she was aware that he had bad reviews",sentence:"Brian (about Joan and Lenny):",question:"Is Brian certain that Lenny had bad reviews?"}, {list:"8",id:"aware-1-P3",condition:"c",sound:"P3-A-1-c.wav",verb:"aware",speaker:"P3",speakerName:"Amelia",speakerGender:"fem",utterance:"Perhaps she was aware that he was a terrible administrator",sentence:"Amelia (about Selena and Scott):",question:"Is Amelia certain that Scott was a terrible administrator?"}, {list:"8",id:"control2",condition:"control",sound:"F2.wav",verb:"control",speaker:"F2",speakerName:"June",speakerGender:"fem",utterance:"I was invited to the party",sentence:"June (about herself):",question:"Is June certain that she was invited to the party?"}, {list:"8",id:"notice-2-P6",condition:"nc",sound:"P6-N-2-nc.wav",verb:"notice",speaker:"P6",speakerName:"Dana",speakerGender:"fem",utterance:"Perhaps she noticed that he had bad breath",sentence:"Dana (about Sue and Mark):",question:"Is Dana certain that Mark has bad breath?"}, {list:"8",id:"discover-2-P8",condition:"nc",sound:"P8-D-2-nc.wav",verb:"discover",speaker:"P8",speakerName:"Liam",speakerGender:"masc",utterance:"Perhaps he discovered that he’s a father",sentence:"Liam (about Simon):",question:"Is Liam certain that Simon is a father?"}, {list:"8",id:"know-2-P4",condition:"c",sound:"P4-K-2-c.wav",verb:"know",speaker:"P4",speakerName:"Alexandra",speakerGender:"fem",utterance:"Perhaps he knew that she was married",sentence:"Alexandra (about Greg and Tara):",question:"Is Alexandra certain that Tara was married?"}, {list:"8",id:"know-3-P12",condition:"c",sound:"P12-K-3-c.wav",verb:"know",speaker:"P12",speakerName:"Lucas",speakerGender:"masc",utterance:"Perhaps she knew that he was wrong",sentence:"Lucas (about Maggie and Toby):",question:"Is Lucas certain that Toby was wrong?"}, {list:"8",id:"aware-2-P1",condition:"nc",sound:"P1-A-2-nc.wav",verb:"aware",speaker:"P1",speakerName:"Amy",speakerGender:"fem",utterance:"Perhaps she was aware that he was unreliable",sentence:"Amy (about Cassie and Bruce):",question:"Is Amy certain that Bruce was unreliable?"}, {list:"8",id:"control1",condition:"control",sound:"F1.wav",verb:"control",speaker:"F1",speakerName:"Julie",speakerGender:"fem",utterance:"I am tired",sentence:"Julie (about herself):",question:"Is Julie certain that she is tired?"}]
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

// slides.auth = slide({
//   	name : "auth",
//   });
  
  
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