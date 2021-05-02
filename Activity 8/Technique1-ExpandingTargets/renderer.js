
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



var parent = document.getElementById("volume-bar");



var icons = parent.children;
var iconChoose=[0,0,0,0,0,0];
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
  var lim = maxTrials/6;
  var val = iconChoose[iconIndex];
  while (val>lim-1){
    iconIndex = Math.round(Math.random()*5);
    val = iconChoose[iconIndex];
  }
  iconChoose[iconIndex]+=1;
  return iconIndex;
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
var catChase = function(e)
{

    var parent = document.getElementById("volume-bar");
    var icons = parent.children;
    var userX = e.clientX;
    var userY = e.clientY;
    
    let thresh = 50;
    let origSize = 50;
    for(var i=0; i < icons.length; i++)
  {
    let img = document.getElementById("button-"+i);
    let imgWidth = img.width;
    let imgHeight = img.height;
    let imgbound=img.getBoundingClientRect();
    let imgX = imgbound.left + (imgWidth / 2);
    let imgY = imgbound.top + (imgHeight / 2);
    let pyth = (userX-imgX)*(userX-imgX)+(userY-imgY)*(userY-imgY);
    let distance = Math.sqrt(pyth);
   // calculates the distiance from the center of the icon using the pythagorean theorem.
    if (distance<thresh){
      var distint = parseInt(distance);
      var add = thresh-distint;
      if (imgWidth<origSize || imgHeight <origSize){
        img.width=origSize;
        img.height=origSize;
      }
      else{
        img.width=origSize+add;
        img.height=origSize+add;
      }
      
    }
    else{
      img.width=origSize;
      img.height=origSize;
    }
  }


    

};

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
  document.onmousemove = catChase;
  // majority of the work will be done in timedClick
  startButton.onclick = timedClick;
  pausePlay.onclick = changeState;
  
}

