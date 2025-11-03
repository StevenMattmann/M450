import { expect } from "jsr:@std/expect";
import { Board } from "./board.js";

Deno.test("validMoves returns at least one for start", () => {
    const b = new Board();
    const m1 = b.validMoves(1);
    const m2 = b.validMoves(2);
    expect(m1.size > 0).toBe(true);
    expect(m2.size > 0).toBe(true);
});

Deno.test("result detects player 1 win", () => {
    const grid = Array.from({ length: 8 }, () => Array(8).fill(1));
    const b = Board.of(grid);
    const res = b.result();
    expect(res.finished).toBe(true);
    expect(res.winner).toBe(1);
    expect(res.tied).toBe(false);
});
