const player = 'O';
const cells = document.querySelectorAll('.cell');
var appendSeconds = document.getElementById("seconds");
var seconds = 00; 
var tens = 00; 
var appendTens = document.getElementById("tens");
const buttonStart = document.querySelector("#start");
var Interval ;
playerMoves = [];
const winCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

buttonStart.onclick = function() {
    
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
    startGame();
 }

function startGame(){
for (var i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
	
    cells[i].addEventListener('click', turnClick, false);
}
}


function turnClick(e){
    const id = e.target.id;
    turn(id);    
}

function turn(id){
    // document.getElementById(id).style.background = 'blue';
    document.getElementById(id).innerHTML = player;
    const playerId = parseInt(id);
    playerMoves.push(playerId);
    checkWin();
}
function checkWin(){
    for (let [index, win] of winCombo.entries()) {
		if (win.every(elem => playerMoves.indexOf(elem) > -1)) {
			gameOver('win', win);
			break;
		}
	}
  
}


function gameOver(e, win){
    if(e == 'win'){
        win.forEach(function(win){
            document.getElementById(win).style.background = 'green';
        })
        const alert = document.createElement("p");
        alert.innerHTML = `Congrats, You Won`;
        alert.className = "alert-success";
        document.querySelector('.alertDiv').appendChild(alert);
        cells.forEach((cell) => {
			cell.removeEventListener("click", turnClick, false);
        })
        }
}


// RESETTING THE GAME
document.querySelector("#btnReset").addEventListener("click", function(){
    window.location.reload();
})



  // START TIMER
  function startTimer () {
    tens++; 
    
    if(tens < 9){
      appendTens.innerHTML = "0" + tens;
    }
    
    if (tens > 9){
      appendTens.innerHTML = tens;
      
    } 
    
    if (tens > 99) {
      console.log("seconds");
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }
    
    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    }
  
  }