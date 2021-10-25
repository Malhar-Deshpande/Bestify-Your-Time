import { COLS, ROWS, BLOCK_SIZE, KEY, LEVEL, POINTS, SHAPES, COLORS, LINES_PER_LEVEL } from './constants';


export interface IPiece {
    x: number;
    y: number;
    color: string;
    shape: number[][];

}

export class Piece implements IPiece {
    x: number;
    y: number;
    color: string;
    shape: number[][];

    constructor(private ctx: CanvasRenderingContext2D) {
        this.spawn();
        
    }

    spawn() {
        const typeId = this.randomizeTetrominoType(COLORS.length - 1);
        this.shape = SHAPES[typeId];
        this.color = COLORS[typeId];
        this.x = typeId === 4 ? 4 : 3;
        this.y = 0;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
                }
            });

        });
    }

    
    move(p: IPiece) {
        this.x = p.x;
        this.y = p.y;
    }

    randomizeTetrominoType(noOfTypes: number): number {
        return Math.floor(Math.random() * noOfTypes + 1);
    }

}