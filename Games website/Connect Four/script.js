const rows = 6;
const columns = 7;

let board;
let currentPlayer = 1;
let isGameActive = true;

let playerColors = {1:"red", 2:"yellow"};
let gameMode = "2p";

const boardElement = document.getElementById("board");
const restartBtn = document.getElementById("restart");
const modeSelect = document.getElementById("mode");
const p1Select = document.getElementById("p1color");
const p2Select = document.getElementById("p2color");

// Initialize board
function createBoard(){
  board = Array.from({length:rows}, ()=>Array(columns).fill(null));
  boardElement.innerHTML="";
  for(let r=0;r<rows;r++){
    for(let c=0;c<columns;c++){
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row=r;
      cell.dataset.col=c;
      boardElement.appendChild(cell);
    }
  }
}

// Get cell element
function getCell(r,c){ return boardElement.children[r*columns + c]; }

// Drop piece
function dropPiece(col){
  for(let r=rows-1;r>=0;r--){
    if(board[r][col]===null){
      board[r][col]=currentPlayer;
      const cell=getCell(r,col);
      cell.classList.add(playerColors[currentPlayer]);

      if(checkWinner(r,col)){
        setTimeout(()=>alert("Player "+currentPlayer+" wins!"), 10);
        isGameActive=false;
        return;
      }
      if(isBoardFull()){
        setTimeout(()=>alert("Draw!"), 10);
        isGameActive=false;
        return;
      }

      switchPlayer();
      if(gameMode.startsWith("ai") && currentPlayer===2 && isGameActive){
        setTimeout(aiMove, 400);
      }
      break;
    }
  }
}

function switchPlayer(){ currentPlayer = currentPlayer===1 ? 2 : 1; }

function aiMove(){
  if(!isGameActive) return;
  let col;
  if(gameMode==="ai_easy"){
    col=getRandomMove();
  } else if(gameMode==="ai_normal"){
    col=getBestMove(1)||getRandomMove(); // block player
  } else if(gameMode==="ai_hard"){
    col=getBestMove(2)||getBestMove(1)||getRandomMove(); // win or block
  }
  dropPiece(col);
}

function getRandomMove(){
  const available=[];
  for(let c=0;c<columns;c++) if(board[0][c]===null) available.push(c);
  return available[Math.floor(Math.random()*available.length)];
}

function getBestMove(player){
  for(let c=0;c<columns;c++){
    for(let r=rows-1;r>=0;r--){
      if(board[r][c]===null){
        board[r][c]=player;
        if(checkWinner(r,c)){ board[r][c]=null; return c; }
        board[r][c]=null;
        break;
      }
    }
  }
  return null;
}

function isBoardFull(){ return board.every(r=>r.every(c=>c!==null)); }

function checkWinner(row,col){
  const player = board[row][col];
  return checkDir(row,col,1,0,player)||
         checkDir(row,col,0,1,player)||
         checkDir(row,col,1,1,player)||
         checkDir(row,col,1,-1,player);
}

function checkDir(r,c,dr,dc,player){
  let count=1, row=r+dr, col=c+dc;
  while(row>=0 && row<rows && col>=0 && col<columns && board[row][col]===player){count++; row+=dr; col+=dc;}
  row=r-dr; col=c-dc;
  while(row>=0 && row<rows && col>=0 && col<columns && board[row][col]===player){count++; row-=dr; col-=dc;}
  return count>=4;
}

// Event listeners
boardElement.addEventListener("click", e=>{
  if(!isGameActive) return;
  if(!e.target.classList.contains("cell")) return;
  if(currentPlayer!==1 && gameMode.startsWith("ai")) return;

  const col=parseInt(e.target.dataset.col);
  if(board[0][col]!==null) return;
  dropPiece(col);
});

restartBtn.addEventListener("click", ()=>{
  playerColors[1]=p1Select.value;
  playerColors[2]=p2Select.value;
  currentPlayer=1;
  isGameActive=true;
  createBoard();
});

modeSelect.addEventListener("change", ()=>{
  gameMode = modeSelect.value;
});

createBoard();