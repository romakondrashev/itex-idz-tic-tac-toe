var game = document.getElementById("game");
var tipsText = document.getElementById("tips");
var gameNumberText = document.getElementById("gameNumber");
var countWinsXText = document.getElementById("countWinsX");
var countWinsOText = document.getElementById("countWinsO");
var previousGamesText = document.getElementById("previousGames");

let tips = ["Ваш ход", "Ход оппонента", "Сделайте первый ход!"];
var gameNumber = 1;
var countWinsX = 0;
var countWinsO = 0;
var freeze = false;

// // расстановка начальных блоков
// for (let i = 0; i < 9; i++) {
// 	game.innerHTML += '<div class="block"></div>';
// }

restart();

var allblock = game.getElementsByClassName("block");

// Определение доступных ячеек для хода
function getPossibleMoves() {
	var index = [];
	for (let i = 0; i < allblock.length; i++) {
		if (allblock[i].innerHTML == "") {
			index += i;
		}
	}
	return index
}

// Ход компьютера
function computerMove() {
	var index = getPossibleMoves();
	var random = Math.floor(Math.random() * index.length);
	var randblock = index[random];
	allblock[randblock].innerHTML = "O";

	freeze = false;
	isGameOver();
	tipsText.innerHTML = tips[0];
}

function restart() {
	freeze = false;
	game.innerHTML = "";
	tipsText.innerHTML = tips[2];
	for (let i = 0; i < 9; i++) 
		game.innerHTML += '<div class="block"></div>';
}
function writeHistoryGame (status) {
	var parent = document.createElement("div");
	parent.setAttribute ("class", "prevGameWrap");
	previousGamesText.prepend( parent );
	var result = document.createElement("p");
	switch (status) {
		case 0:
			result.innerHTML = "Ничья!";
			result.setAttribute ("class", "draw");
			break;
		case 1:
			result.innerHTML = "Победа!";
			result.setAttribute ("class", "win");
			break;
		case 2:
			result.innerHTML = "Поражение!";
			result.setAttribute ("class", "loose");
			break;
	}
	
	previousGamesText.prepend( result );
	document.getElementsByClassName("prevGameWrap")[0].innerHTML = game.innerHTML;
}
// Проверка на завершение игры
// false - игра ещё не завершена
// true - игра завершена
function isGameOver() {
	var rez = check();
	var index = getPossibleMoves()
	if (rez) {
		switch (rez) {
			case 1:
				freeze = true;
				writeHistoryGame(1);
				tipsText.innerHTML = "Победили крестики!";
				countWinsXText.innerHTML = ++countWinsX;
				break;
			case 2:
				freeze = true;
				writeHistoryGame(2);
				tipsText.innerHTML = "Победили нолики!";
				countWinsOText.innerHTML = ++countWinsO;
				break;
		}
	} else {
		if (index.length == 0) {
			freeze = true;
			writeHistoryGame(0);
			tipsText.innerHTML = "Ничья!";
		}
	}
	if (rez || index.length == 0) {
		setTimeout(restart, 3000);
		gameNumberText.innerHTML = ++gameNumber;
		return true
	}
	return false
}
function check() {
	var combo = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
	];
	for (let i = 0; i < combo.length; i++) {
		if (allblock[combo[i][0]].innerHTML == "X" && allblock[combo[i][1]].innerHTML == "X" && allblock[combo[i][2]].innerHTML == "X") return 1;
		if (allblock[combo[i][0]].innerHTML == "O" && allblock[combo[i][1]].innerHTML == "O" && allblock[combo[i][2]].innerHTML == "O") return 2;
	}
}
game.onclick = function(e) {
	if (!freeze) {
		if (e.target.innerHTML == "") {
			e.target.innerHTML = "X";
			freeze = true;
			if (!isGameOver()) {
				tipsText.innerHTML = tips[1];
				setTimeout(computerMove, 500);
			}
		}
	}
}
