// references to HTML elements
var knob = document.querySelector(".circle");
var volumeDisplay = document.getElementById("volume-display");
var musicPlayer = document.getElementById("music-player");

// check the state of the gesture every 20ms
setInterval(checkGesture,20);

// holds the most recently sampled gesture value
var currGestureValue = -1;

// function will be called at set intervals to check the gesture state
function checkGesture()
{
  // if a gesture is occuring, sample gesture parameter values
  if(gestureOccuring)
  {
    if (currGestureValue!=xValue){
      currGestureValue=xValue;
    }
    if (currGestureValue<50){
      currGestureValue=50;
    }
    if (currGestureValue>250){
      currGestureValue=250;
    }
    var scale = (100-0)/(250-50);
    currGestureValue=Math.round((currGestureValue-50)*scale);
    setVolume(currGestureValue);
  }
}

// this function handles volume setting 
// translates the desired volume into the actual pixel placement of the slider
function setVolume(volume)
{
  musicPlayer.volume=volume/100;
  volumeDisplay.innerHTML=volume;
  vol = volume/100;
  var bound = document.getElementById("slider-bar").getBoundingClientRect().left;
  bound=bound+253;
  knob.style.left=bound+295*vol+"px";
}
