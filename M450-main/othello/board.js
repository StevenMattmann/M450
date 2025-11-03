const dimension = 8;
const empty = 0;
const one = 1;
const two = 2;

const initRowColPlayer = [
  [3, 3, two],
  [3, 4, one],
  [4, 4, two],
  [4, 3, one],
];

const shifts = [
  [-1, +0], [-1, +1], [+0, +1], [+1, +1],
  [+1, +0], [+1, -1], [+0, -1], [-1, -1],
];

export class Board {
  constructor() {
    let fields = Array.from({ length: dimension }, () =>
        Array.from({ length: dimension }, () => empty)
    );
    initRowColPlayer.forEach(([row, col, val]) => {
      fields[row][col] = val;
    });
    this.fields = fields;
  }

  static of(fields) {
    if (fields.length !== dimension)
      throw new RangeError(`fields requires ${dimension} rows`);
    for (let row of fields) {
      if (row.length !== dimension)
        throw new RangeError(`row requires ${dimension} cols`);
      for (let v of row)
        if (![empty, one, two].includes(v))
          throw new RangeError(`illegal value ${v}`);
    }
    const b = new Board();
    b.fields = fields;
    return b;
  }

  opponent(p) {
    if (p === one) return two;
    if (p === two) return one;
    throw new RangeError(`illegal player ${p}`);
  }

  fieldsWithState(state) {
    const res = [];
    for (let r = 0; r < dimension; r++)
      for (let c = 0; c < dimension; c++)
        if (this.fields[r][c] === state) res.push([r, c]);
    return res;
  }

  isValidMove(player, row, col) {
    if (![one, two].includes(player))
      throw new RangeError(`illegal player ${player}`);
    if (typeof row !== "number" || typeof col !== "number" || Number.isNaN(row) || Number.isNaN(col))
      throw new TypeError("row and col must be numbers");
    if (row < 0 || row >= dimension || col < 0 || col >= dimension)
      throw new RangeError(`move [${row}/${col}] is out of bounds`);
    if (this.fields[row][col] !== empty) return false;

    const other = this.opponent(player);
    for (const [dr, dc] of shifts) {
      let r = row + dr, c = col + dc;
      if (r < 0 || r >= dimension || c < 0 || c >= dimension || this.fields[r][c] !== other)
        continue;
      r += dr; c += dc;
      while (r >= 0 && r < dimension && c >= 0 && c < dimension) {
        const v = this.fields[r][c];
        if (v === empty) break;
        if (v === player) return true;
        r += dr; c += dc;
      }
    }
    return false;
  }

  validMoves(player) {
    const s = new Set();
    for (let r = 0; r < dimension; r++)
      for (let c = 0; c < dimension; c++)
        if (this.isValidMove(player, r, c)) s.add(`${r}:${c}`);
    return s;
  }

  result() {
    const e = this.fieldsWithState(empty).length;
    const p1 = this.fieldsWithState(one).length;
    const p2 = this.fieldsWithState(two).length;
    const finished = e === 0;
    let tied = false, winner = 0;
    if (finished) {
      if (p1 > p2) winner = one;
      else if (p2 > p1) winner = two;
      else tied = true;
    }
    return { playerOne: p1, playerTwo: p2, finished, tied, winner };
  }
}
