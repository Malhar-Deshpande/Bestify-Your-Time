export const COLS = 13;
export const ROWS = 14;
export const BLOCK_SIZE = 30;
export const LINES_PER_LEVEL = 10;
export const COLORS = ['none', 'cyan', 'blue', 'orange', 'yellow', 'green', 'purple', 'red'];
export const SHAPES = [[], [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
[[2, 0, 0], [2, 2, 2], [0, 0, 0]],
[[0, 0, 3], [3, 3, 3], [0, 0, 0]],
[[4, 4], [4, 4]],
[[0, 5, 5], [5, 5, 0], [0, 0, 0]],
[[0, 6, 0], [6, 6, 6], [0, 0, 0]],
[[7, 7, 0], [0, 7, 7], [0, 0, 0]],


];

export enum KEY {
    ESC = 27,
    SPACE = 32,
    LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40,
}

export class POINTS {
    static readonly SINGLE = 100;
    static readonly DOUBLE = 300;
    static readonly TRIPLE = 500;
    static readonly TETRIS = 800;
    static readonly SOFT_DROP = 1;
    static readonly HARD_DROP = 2;
}

export const LEVEL = [800, 720, 630, 550, 470, 380,
    300, 220, 130, 100, 80, 80, 80, 70, 70, 70, 50, 50, 50, 30, 30]

