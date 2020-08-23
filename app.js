const Huplayer = 'O';
const aiPlayer = 'X';
const cells = document.querySelectorAll('.cell');
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
const buttonStart = document.querySelector("#start");




buttonStart.onclick = function() {
    
    startGame();
 }

 origBoard = Array.from(Array(9).keys());

function startGame(){
  
  for (var i = 0; i < cells.length; i++) {
      cells[i].innerText = '';
      cells[i].style.removeProperty('background-color');
    
      cells[i].addEventListener('click', turnClick, false);
  }
  }


function turnClick(e){
    const id = e.target.id;
    turn(id, Huplayer);
    if(!checkTie()){
      turn(bestSpot(), aiPlayer);
    }
}

function turn(id, player){
    // document.getElementById(id).style.background = 'blue';
    origBoard[id] = player;
    document.getElementById(id).innerHTML = player;
    let gameWon = checkWin(origBoard, player);
    if(gameWon){
			gameOver(gameWon);
    }
}
function checkWin(board, player) {
  let plays = board.reduce((a, e, i) => 
     (e === player) ? a.concat(i) : a, []);
     let gameWon = null;
      for (let [index, win] of winCombo.entries()) {
      if (win.every(elem => plays.indexOf(elem) > -1)) {
        gameWon = {index: index, player: player};
        break;
      }
  }
  return gameWon;
  
}

function bestSpot(){ 
 return minimax(origBoard, aiPlayer).index;
}
function availableSpots(){
  return origBoard.filter(e => typeof e == 'number');
}


function gameOver(gameWon){
  for (let index of winCombo[gameWon.index]) { 
    if(gameWon.player == Huplayer){
      document.getElementById(index).style.background = 'green';
    }else if(gameWon.player == aiPlayer){
      document.getElementById(index).style.background = 'red';
    }
  }
  const alert = document.createElement("p");
  if(gameWon.player == Huplayer){
    diclareWinner('Congrats, you Won', 'alert-success');

  }else if(gameWon.player == aiPlayer){
    diclareWinner('Bad, you Lost', 'alert-danger');
  }
  cells.forEach((cell) => {
  cell.removeEventListener("click", turnClick, false);
})
        
}
function checkTie() {
	if (availableSpots().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!", 'alert-success');
		return true;
	}
	return false;
}

function diclareWinner(message, className) {
  const alert = document.createElement("p");
  alert.innerHTML = message;
  alert.className = className;
  document.querySelector('.alertDiv').appendChild(alert);
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
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }
    
    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    }
  
  }

 
function minimax(newBoard, player) {
	var availSpots = availableSpots();

	if (checkWin(newBoard, Huplayer)) {
		return {score: -10};
	} else if (checkWin(newBoard, aiPlayer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
    }
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == aiPlayer) {
			var result = minimax(newBoard, Huplayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === aiPlayer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}
