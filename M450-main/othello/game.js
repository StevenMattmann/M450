import { Board } from "./board.js";

let board = new Board();

function fieldId(r, c) {
  return `${r}-${c}`;
}

function render() {
  console.clear();
  console.log("Othello Board:");
  for (let r = 0; r < 8; r++) {
    console.log(
        board.fields[r].map((v) => (v === 0 ? "." : v === 1 ? "B" : "W")).join(" ")
    );
  }
  const res = board.result();
  console.log(`\nBlack: ${res.playerOne} | White: ${res.playerTwo}`);
  if (res.finished)
    console.log(res.tied ? "Tied game" : `Winner: Player ${res.winner}`);
}

render();

// Beispielinteraktion
const valid = board.isValidMove(1, 2, 3);
console.log(`\nIs move (2,3) valid for player 1? ${valid}`);
