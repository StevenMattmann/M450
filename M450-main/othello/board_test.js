import { expect } from "jsr:@std/expect";
import { Board } from "./board.js";

Deno.test("initial counts correct", () => {
    const b = new Board();
    expect(b.fieldsWithState(1).length).toBe(2);
    expect(b.fieldsWithState(2).length).toBe(2);
});

Deno.test("isValidMove: standard valid move", () => {
    const b = new Board();
    expect(b.isValidMove(1, 2, 3)).toBe(true);
});

Deno.test("isValidMove: non-flanking empty field", () => {
    const b = new Board();
    expect(b.isValidMove(1, 0, 0)).toBe(false);
});

Deno.test("isValidMove: occupied cell", () => {
    const b = new Board();
    expect(b.isValidMove(1, 3, 4)).toBe(false);
});

Deno.test("isValidMove: out of bounds", () => {
    const b = new Board();
    expect(() => b.isValidMove(1, -1, 0)).toThrow(RangeError);
    expect(() => b.isValidMove(1, 0, 8)).toThrow(RangeError);
});

Deno.test("isValidMove: wrong player", () => {
    const b = new Board();
    expect(() => b.isValidMove(3, 2, 3)).toThrow(RangeError);
});

Deno.test("isValidMove: edge flank", () => {
    const row0 = [1, 2, 2, 0, 0, 0, 0, 0];
    const empty = Array(8).fill(0);
    const grid = [row0, ...Array(7).fill(empty)];
    const b = Board.of(grid);
    expect(b.isValidMove(1, 0, 3)).toBe(true);
});

Deno.test("result: tied game", () => {
    const grid = [];
    for (let r = 0; r < 8; r++) {
        const row = [];
        for (let c = 0; c < 8; c++) {
            row.push(((r + c) % 2) === 0 ? 1 : 2);
        }
        grid.push(row);
    }
    const b = Board.of(grid);
    const res = b.result();
    expect(res.tied).toBe(true);
    expect(res.winner).toBe(0);
});
