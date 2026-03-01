const board = document.getElementById("board");
let currentPlayer = "X";

for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");

  cell.addEventListener("click", () => {
    if (!cell.textContent) {
      cell.textContent = currentPlayer;
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  });

  board.appendChild(cell);
}