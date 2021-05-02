// references to HTMl elements
var knob = document.getElementById("volume-knob");
var volumeDisplay = document.getElementById("volume-display");
var musicPlayer = document.getElementById("music-player");

// check the state of the gesture every 20ms
setInterval(checkGesture,20);

// holds the most recently sampled gesture value
var currGestureValue = -1;

// function will be called at set intervals to check the gesture state
function checkGesture()
{
  // if a gesture is in fact occuring, we want to sample gesture values
  if(gestureOccuring)
  {
    if (currGestureValue!=rotationAngle){
      currGestureValue=rotationAngle;
    }
    if (currGestureValue<160){
      currGestureValue=160;
    }
    if(currGestureValue>205){
      currGestureValue=205;
    }
    var scale = (100-0)/(205-160);
    currGestureValue=Math.round((currGestureValue-160)*scale);
    setVolume(currGestureValue);
  }
}

// this function handles volume setting
// translates the desired volume into the actual angle of rotation of the knob 
function setVolume(volume)
{
  musicPlayer.volume=volume/100;
  volumeDisplay.innerHTML=volume;
  var degrees=volume*1.8;
  knob.style.transform = 'rotate(' + degrees + 'deg)';
}
