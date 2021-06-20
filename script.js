document.addEventListener("DOMContentLoaded", createBoard());

function createBoard(){
	const gameBoard = document.getElementById("gameBoard");
	for(let i=1;i<=9;i++){
		const box = document.createElement('div');
		box.setAttribute('id', i);
		box.classList.add('box');
		gameBoard.appendChild(box);
	}
}	

const enter = document.getElementById("enter");

enter.addEventListener('click', () => {
	module.createPlayer();
	module.playerController();
});

const refresh = document.getElementById("refresh");

refresh.addEventListener('click', () => {
	location.reload();
});


const module = (function(){
	const turnCounter = document.getElementById("turnCounter");
	const boxes = document.getElementsByClassName("box");
	const allboxes = Array.from(boxes);
	let _playerX;
	let _playerO;
	let _turn = "X";

	let player = function(name, marker){
		let _score = 0;
		const incrementScore = () => {
			_score++;
		}
		const getScore = () => {
			return _score;
		}
	return {name, marker, incrementScore, getScore};
	}
	
	/*            0   1   2
	let board = [0 ["", "", ""],
			     1 ["", "", ""],
			     2 ["", "", ""]];
	
	*/

	let _boardToArrayMapping = {1:"00", 2:"01", 3:"02", 4:"10", 5:"11", 6:"12", 7:"20", 8:"21", 9:"22"};

	let _board = [["", "", ""],
			     ["", "", ""],
			     ["", "", ""]];
	
	function createPlayer(){
		const playerNameX = document.getElementById("playerX").value;
		const playerNameO = document.getElementById("playerO").value;
		playerX = player(playerNameX, "X");
		playerO = player(playerNameO, "O");
		turnCounter.textContent = `${playerX.name}'s (X) turn`;
	}

	
	function playerController(val){
		allboxes.map(x => {x.addEventListener('click', (e) => {
		if(_turn === "X"){
			_playerChoices(e, _turn);
		}else{
			_playerChoices(e, _turn);
		}
		})});
	}

	function _playerChoices(e, val){
		var id = e.target.id;
		var fill = document.getElementById(id);
		if(fill.textContent == ""){
			const [a,b] = _boardToArrayMapping[id];
			fill.textContent = val;
			_board[a][b] = val;
			console.log(_board);
			_checkWinner(_board);
			if(val === "X"){
				_turn = "O";
				turnCounter.textContent = `${playerO.name}'s (${_turn}) turn`;
			}else{
				_turn = "X";
				turnCounter.textContent = `${playerX.name}'s (${_turn}) turn`;
			}
		}
	}

	function _checkWinner(board){
		const winnerdiv = document.getElementById('winnerdiv');
		let _winArray = [[1,2,3],
						[4,5,6],
						[7,8,9],
						[1,4,7],
						[2,5,8],
						[3,6,9],
						[1,5,9],
						[3,5,7]];

		for(let i=0;i<8;i++){
			let w = _winArray[i];
			let [a,b] = _boardToArrayMapping[w[0]];
			let [c,d] = _boardToArrayMapping[w[1]];
			let [e,f] = _boardToArrayMapping[w[2]];
			if((_board[a][b] == "X") && (_board[c][d] == "X") && (_board[e][f] == "X")){
				turnCounter.style.display = "none";
				winnerdiv.textContent = `${playerX.name} (X) won`;
				break;
			}else if((_board[a][b] == "O") && (_board[c][d] == "O") && (_board[e][f] == "O")){
				turnCounter.style.display = "none";
				winnerdiv.textContent = `${playerO.name} (O) won`;
				break;
			}
		}
	}

	return {playerController, createPlayer};

})();


