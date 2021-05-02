// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var closedbox = document.getElementById("closed");
var changed = document.getElementById("opened");
var changed2 = document.getElementById("opened2");
closedbox.onclick = function(){
  changed.style.display="block";
  changed2.style.display="block";
  closedbox.style.display="none";
};

var catChase = function(e)
{
    var userX = e.clientX;
    var userY = e.clientY;
    changed2.style.left = userX + "px";
    changed2.style.top = userY + "px";
    var coords = document.getElementById("location");
    coords.innerHTML = "You are at: (" + userX + "," + userY + ")";
};

window.onload = function() 
{ 
  document.onmousemove = catChase;
}