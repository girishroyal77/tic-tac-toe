document.getElementById("restartBtn").addEventListener("click", resetGame);
const board = document.getElementById("board");
let currentPlayer = "X";
let cells = [];
let gameOver = false;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function createBoard() {
  board.innerHTML = "";
  cells = [];
  gameOver = false;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleClick(cell, i));
    board.appendChild(cell);
    cells.push("");
  }
}

function handleClick(cell, index) {
  if (cells[index] !== "" || gameOver) return;

  cells[index] = currentPlayer;
  cell.textContent = currentPlayer;

  const win = checkWinner();
  if (win) {
    drawLine(win);
    alert(currentPlayer + " wins!");
    gameOver = true;
    return;
  }

  if (!cells.includes("")) {
    alert("Draw!");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return pattern;
    }
  }
  return null;
}

function drawLine(pattern) {
  const line = document.createElement("div");
  line.classList.add("line");

  const positions = [
    [50, 50, 0],     // row 1
    [50, 155, 0],    // row 2
    [50, 260, 0],    // row 3
    [50, 50, 90],    // col 1
    [155, 50, 90],   // col 2
    [260, 50, 90],   // col 3
    [50, 50, 45],    // diag \
    [50, 260, -45]   // diag /
  ];

  const index = winPatterns.findIndex(p => p.toString() === pattern.toString());
  const [top, left, angle] = positions[index];

  line.style.width = "300px";
  line.style.top = top + "px";
  line.style.left = left + "px";
  line.style.transform = `rotate(${angle}deg)`;

  board.appendChild(line);
}

function resetGame() {
  currentPlayer = "X";
  createBoard();
}

createBoard();