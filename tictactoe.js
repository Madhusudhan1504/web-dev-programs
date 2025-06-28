const board = document.getElementById('board');
const statusDiv = document.getElementById('status');
const resetBtn = document.getElementById('reset');
let cells = Array.from(document.getElementsByClassName('cell'));
let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill('');

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diags
];

function handleCellClick(e) {
  const idx = parseInt(e.target.getAttribute('data-index'));
  if (!gameActive || gameState[idx]) return;
  gameState[idx] = currentPlayer;
  e.target.textContent = currentPlayer;
  if (checkWin()) {
    statusDiv.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (gameState.every(cell => cell)) {
    statusDiv.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'Y' : 'X';
    statusDiv.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winPatterns.some(pattern =>
    pattern.every(idx => gameState[idx] === currentPlayer)
  );
}

function resetGame() {
  gameState = Array(9).fill('');
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameActive = true;
  statusDiv.textContent = `Player X's turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame); 