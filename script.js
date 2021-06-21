document.addEventListener("DOMContentLoaded", createBoard());

//Create a board, not a part of game so outside module
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

//onclick of enter, first create players, then allow game to begin
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

	//factory function to create my player
	let player = function(name, marker){
		return {name, marker};
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

	//playerController controls game
	//It checks the turn and calls playerChoices
	//Also checks whether game is draw or not
	function playerController(){
		var count = 0;
		allboxes.map(x => {x.addEventListener('click', (e) => {
		var box = document.getElementById(e.target.id);
		
		if(_turn === "X"){
			_playerChoices(e, _turn);
			box.style.backgroundColor = '#BC8F8F';
			count++;
		}else{
			_playerChoices(e, _turn);
			box.style.backgroundColor = '#FFDAB9';
			count++;
		}if(count == 9){
			allboxes.map(x => x.style.pointerEvents = 'none');
			turnCounter.style.display = "none";
			winnerdiv.textContent = `😃 It's a draw 😃`;
		}
		})});
		

	}

	//_playerChoices fills board array with player's choices
	//Call _checkWinner to check winner after each move
	//According to turn sets the text content of textCounter
	//Disables pointer events after a grid is filled
	function _playerChoices(e, val){
		var id = e.target.id;
		var flag;
		var fill = document.getElementById(id);
		if(fill.textContent == ""){
			const [a,b] = _boardToArrayMapping[id];
			fill.textContent = val;
			_board[a][b] = val;
			flag = _checkWinner(_board);
			if(flag != 1){
				if(val === "X"){
					_turn = "O";
					turnCounter.textContent = `${playerO.name}'s (${_turn}) turn`;
				}else{
					_turn = "X";
					turnCounter.textContent = `${playerX.name}'s (${_turn}) turn`;
				}
			}else if(flag == 1){
				allboxes.map(x => x.style.pointerEvents = 'none');
			}

		}
		fill.style.pointerEvents = 'none';
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
		let _flag = 0;
		for(let i=0;i<8;i++){
			let w = _winArray[i];
			let [a,b] = _boardToArrayMapping[w[0]];
			let [c,d] = _boardToArrayMapping[w[1]];
			let [e,f] = _boardToArrayMapping[w[2]];
			if((_board[a][b] == "X") && (_board[c][d] == "X") && (_board[e][f] == "X")){
				turnCounter.style.display = "none";
				winnerdiv.textContent = `🎉 ${playerX.name} (X) won 🎉`;
				_flag = 1;
				break;
			}else if((_board[a][b] == "O") && (_board[c][d] == "O") && (_board[e][f] == "O")){
				turnCounter.style.display = "none";
				_flag = 1;
				winnerdiv.textContent = `🎉 ${playerO.name} (O) won 🎉`;
				break;
			}
		}
		return _flag;
		
	}

	return {playerController, createPlayer};

})();


