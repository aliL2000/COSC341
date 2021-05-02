
const app = require('electron').remote.app;
const fileDir = app.getPath('desktop');
const path = require("path");

var fs = require('fs');


var dataLog = "";


var clicks = 0;

var maxTrials = 6;
var pausePlay = document.getElementById("player-button");
var music = document.getElementById("music-player");
var display = document.getElementById("volume-display");

var currentLevel=100;

var startButton = document.getElementById("start-button");


var counterDisplay = document.getElementById("counter");
counterDisplay.innerHTML = "There are "+maxTrials +" trials in total";

 var volIndicator = document.getElementById("volume-target");



var parent = document.getElementById("volume-button-container");



var icons = parent.children;
var iconChoose=[0,0,0,0,0,0];
var iconChoices=[0,0,0,0,0,0];
var choices=["Mute","20","40","60","80","100"];



function save()
{

  fs.writeFile( path.resolve(fileDir, "JStest.csv"), dataLog, (err)=> {
    if (err) alert(err);
    alert("all tasks are done");
  });
}



function randomIcon()
{

  var iconIndex = Math.round(Math.random()*5);
  var ind=parseInt(icons[iconIndex].id.substring(7,8));
  var val = iconChoices[ind];
  var lim = parseInt(maxTrials/6);
  while (val>lim-1){
    iconIndex = Math.round(Math.random()*5);
    ind=parseInt(icons[iconIndex].id.substring(7,8));
    val = iconChoices[ind];
  }
  iconChoices[ind]+=1;
  return ind;
}

var timedClick = function()
{

  startButton.onclick = function(){};
  
  counterDisplay.innerHTML="";
  var targetIndex = randomIcon();
  var targetVal = choices[targetIndex];
  volIndicator.innerHTML = "Set volume to: "+targetVal;
  
  // start timing right here
  var startTime = performance.now();

  for(var i=0; i < icons.length; i++)
  {
    let clickedInd = i;
    icons[i].onclick = function()
    {
      
      var actualInd = parseInt(icons[clickedInd].id.substring(7,8));
     
      iconChoose[actualInd]+=1;

      var newOrder=[0,0,0,0,0];
      var count=0;
      var copyoficonsFreq=[...iconChoose];
      while (count<6){
        
        var tempind = copyoficonsFreq.indexOf(Math.max(...copyoficonsFreq));
        newOrder[count]=tempind;
        copyoficonsFreq[tempind]=-1;
        count+=1;
      }
      //alert(newOrder)

      newOrder.forEach( argIndex => parent.appendChild(document.getElementById("button-"+argIndex))); 






      var endTime = performance.now();
      var timeTaken = endTime - startTime;
      timeTaken = Math.round(timeTaken);

      alert("That took:" + timeTaken + " ms.");

      clicks++;
    
      
      for(var i=0; i < icons.length; i++)
      {
        icons[i].onclick = function(){};
      }
      var iconClicked = this.dataset.volume; 

      var hold = clicks + ", " + targetVal + ","+ iconClicked+", "+ timeTaken+"\n";
      
      dataLog+=hold;
      currentLevel = iconClicked;
      
      if (music.paused){
        music.volume=currentLevel/100;
      }
      else {
        music.volume=currentLevel/100;
        display.innerHTML="Current volume is: "+currentLevel;
      }


      if (clicks==maxTrials){
        save();
        clicks=0;
        dataLog="";
      }
      startButton.style.display="block";
      volIndicator.innerHTML="Start next trial";
      counterDisplay.innerHTML="Trials Completed: " + clicks;
      startButton.onclick = timedClick;
    }
  }
}


var changeState = function()
{
  if (music.paused){
    pausePlay.src="https://people.ok.ubc.ca/bowenhui/341/2020/project/a8assets/pause.png";
    music.play();
    music.volume=currentLevel/100;
    display.innerHTML="Current volume is: "+currentLevel;
  }
  else {
    pausePlay.src="https://people.ok.ubc.ca/bowenhui/341/2020/project/a8assets/play.png";
    music.pause();
    display.innerHTML="Music Paused";
  }
};

window.onload = function() 
{ 
  startButton.onclick = timedClick;
  pausePlay.onclick = changeState;
  
}

