// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
document.getElementById("message").innerHTML = "Try your luck!";

var game = document.getElementById("message");

var userNumber = document.getElementById("number");

var gameButton = document.getElementById("startGame");
gameButton.onclick = function(){
    
    var someNumber = Math.random()*21 + 5;  
    someNumber = Math.round(someNumber);
    var userNum = userNumber.value;
    if (userNum=someNumber){
        var hold= "Sorry! Not close enough! It was ";
        game.innerHTML = hold.concat(someNumber);
    }
    else{
        game.innerHTML = "Great job! You won!";
    }
    

}