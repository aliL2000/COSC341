// Tips and hints are provided throughout, make sure to read them!
const app = require('electron').remote.app;
const fileDir = app.getPath('desktop');
const path = require("path");

var fs = require('fs');

// this will hold all the data we need
var dataLog = "";

// this will count how many clicks have occured
var clicks = 0;

// max number of trials to run 
var maxTrials = 5;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TODO: Complete these declaration statements to get all the required elements from your HTML file! 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// reference our start button
var startButton = document.getElementById("startBtn");

// display how many tasks a user has completed (choose the correct HTML element)
var counterDisplay = document.getElementById("counter");

// display the target icon to click (find the element with this HTML tag)
 var indicator = document.getElementById("indicator");


// element that holds all your icons 
var parent = document.getElementById("iconDrawer");


// array of all icons (hint: use the parent var to reference its children icons)
var icons = parent.children;
var iconChoose=[0,0,0,0,0];

/////////////////////////////////////////////////////////////////////////////////////
// TODO: Set the filepath so you know where the .csv file is going! 
/////////////////////////////////////////////////////////////////////////////////////

function save()
{
  // change the filepath in the writeFile() function
  fs.writeFile( path.resolve(fileDir, "JStest.csv"), dataLog, (err)=> {
    if (err) alert(err);
    alert("all tasks are done");
  });
}

/////////////////////////////////////////////
// TODO: Complete the randomIcon function! //
/////////////////////////////////////////////

function randomIcon()
{
  // Generate a random number in the appropriate range 
  var iconIndex = Math.round(Math.random()*4);
  var lim = maxTrials/5;
  var val = iconChoose[iconIndex];
  while (val>lim-1){
    iconIndex = Math.round(Math.random()*4);
    val = iconChoose[iconIndex];
  }
  iconChoose[iconIndex]+=1;
  return iconIndex;
}

/////////////////////////////////////////////
// TODO: Complete the timedClick function! //
/////////////////////////////////////////////
var timedClick = function()
{
  // disables the start button so user can't press it twice 
  startButton.onclick = function(){};

  // call randomIcon function to get random index and the matching icon
  var targetIndex = randomIcon();
  var targetIcon = icons[targetIndex];

  // Update the 'indicator' element to show the target icon 
  // Hint: you need to access the attribute of targetIcon
  //indicator.src = ?
  indicator.src = targetIcon.src;
  // start timing right here
  var startTime = performance.now();
  // this is where we are going to start watching for clicks on icons
  // this loop will add an onclick function to each icon
  for(var i=0; i < icons.length; i++)
  {
    icons[i].onclick = function()
    {
      // everything in here will occur when an icon is pressed

      // stop timing and record how long it took
      // calculate time elapsed 
      // record whole milliseconds (use Math.round())
      var endTime = performance.now();
      var timeTaken = endTime - startTime;
      timeTaken = Math.round(timeTaken);

      alert("That took:" + timeTaken + " ms.");

      clicks++;
    
      // we want to ensure only 1 icon can be clicked at a time, so disable all the onclicks now! 
      // HINT: loop through all the icons and disable the function like we did with the start button
      for(var i=0; i < icons.length; i++)
      {
        icons[i].onclick = function(){};
      }
      // record the time and positions of the target icon and the icon the user actually pressed
      // this is to be stored in a new line in the 'dataLog' variable
      // append to the 'dataLog' variable, a line like 'timeTaken','targetIndex','iconClicked'
      // to save you some headache, we define iconClicked for you
      var iconClicked = this.id[1]; // INCLUDE THIS
      
      var hold = clicks + ", " + targetIndex + ","+ iconClicked+", "+ timeTaken+"\n";
      
      dataLog+=hold;


      // now add to the end of the 'dataLog' variable as explained above

      // increment clicks completed
      
      // update what the counterDisplay says!
      // modify the innerHTML property of counterDisplay
      // it should show the user how many clicks have currently been completed

      counterDisplay.innerHTML = clicks + " tasks of " + maxTrials +" completed.";


      // if maxTrials is reached, then data collection is over, so call save and reset 'clicks' and 'dataLog'
      if (clicks==maxTrials){
        save();
        clicks=0;
        dataLog="";
      }
      // reactivate the start button by changing the onclick function from nothing back to starting the trial
      startButton.onclick = timedClick;
    }
  }
}
var catChase = function(e)
{

    var parent = document.getElementById("iconDrawer");
    var icons = parent.children;
    var userX = e.clientX;
    var userY = e.clientY;
    var coords = document.getElementById("location");
    coords.innerHTML = "You are at: (" + userX + "," + userY +")";
    let thresh = 100;
    let origSize = 50;
    for(var i=0; i < icons.length; i++)
  {
    let img = document.getElementById("i"+i);
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


window.onload = function() 
{ 
  document.onmousemove = catChase;
  // majority of the work will be done in timedClick
  startButton.onclick = timedClick;
  
}

