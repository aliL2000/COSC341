var portraitSection = document.getElementById("portrait-section");
var portraits = portraitSection.children;
var anxiety = portraits[2];
var despair = portraits[1];
var scream = portraits[0];

var startTime = performance.now();

portraitSection.appendChild(anxiety);
portraitSection.appendChild(despair);
portraitSection.appendChild(scream);

window.onload = function(){
  
  portraits[0].onclick = function(){ 
    alert("Don't Touch The Paintings!"); 
  }
  portraits[2].onclick = function(){ 
    alert("Don't Touch The Paintings!"); 
  }
    
}

var button = document.getElementById("fee");
button.onclick=function(){
  var endTime = performance.now();
  var timeTaken = endTime - startTime;
  timeTaken = Math.round(timeTaken);
  var fee = ( timeTaken / 60 / 1000 ) * 20;
  fee=Math.round(fee) 
  alert("You need to pay $".concat(fee)); 
}

            


portraits[1].onclick = function(){ 
    var hold = Math.round(Math.random()*1+1);
    if (hold==1){
      if (portraits[1].width>149){
        portraits[1].width = portraits[1].width-50;
        portraits[1].height = portraits[1].height-50;
      }
    }
    else{
      if (portraits[1].width<251){
        portraits[1].width = portraits[1].width+50;
        portraits[1].height = portraits[1].height+50;
      }
      
    }
}