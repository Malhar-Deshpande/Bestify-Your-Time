import { Component, ViewChild, ElementRef, OnInit, HostListener } from '@angular/core';
import { COLS, ROWS, BLOCK_SIZE, KEY,LEVEL, POINTS, COLORS, LINES_PER_LEVEL } from './constants';
import { Piece, IPiece } from './piece.component'
import { GameService } from './game.service'
@Component({
  selector: 'app-board',
  templateUrl: './block-game-board.component.html',
  styleUrls: ['./block-game-board.component.scss']
})
export class BoardComponent implements OnInit {


  @ViewChild('board', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  board: number[][];
  piece: Piece;
  next: Piece;
  requestId: number;
  time: { start: number; elapsed: number; level: number };
  points: number;
  lines: number;
  level: number;
  public best_score = this.service.retrieve();
  
  
  moves = {
    [KEY.LEFT]: (p: IPiece): IPiece => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: (p: IPiece): IPiece => ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]: (p: IPiece): IPiece => ({ ...p, y: p.y + 1 }),
    [KEY.SPACE]: (p: IPiece): IPiece => ({ ...p, y: p.y + 1 }),
    [KEY.UP]: (p: IPiece): IPiece => ({ ...p, y: p.y - 1 }),
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY.ESC) {
      this.gameOver();
    } else if (event.keyCode == KEY.DOWN || event.keyCode == KEY.LEFT || event.keyCode == KEY.UP || event.keyCode == KEY.RIGHT || event.keyCode == KEY.SPACE) {
      event.preventDefault();

      let p = this.moves[event.keyCode](this.piece);
      if (event.keyCode === KEY.SPACE) {
        while (this.service.valid(p, this.board)) {
          this.points += POINTS.HARD_DROP;
          this.piece.move(p);
          p = this.moves[KEY.DOWN](this.piece);
        }
      } else if (this.service.valid(p, this.board)) {
        this.piece.move(p);
        if (event.keyCode === KEY.DOWN) {
          this.points += POINTS.SOFT_DROP;
        }
      }
    }
  }
  constructor(private service: GameService) {
  
  }

  ngOnInit() {
    this.initBoard();
    this.resetGame();
  }

  initBoard() {

    const ctx = this.canvas.nativeElement.getContext('2d');

    if (!ctx) {
      throw new Error("getcontext(2d) failed");
    }
    this.ctx = ctx;
    this.ctx.canvas.width = COLS * BLOCK_SIZE;
    this.ctx.canvas.height = ROWS * BLOCK_SIZE;
    this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
  }

  play() {
    this.resetGame();
    this.next = new Piece(this.ctx);
    this.piece = new Piece(this.ctx);
    //this.next.drawNext(this.ctxNext);
    this.time.start = performance.now();

    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }
    this.animate();
  }

  resetGame() {
    this.points = 0;
    this.lines = 0;
    this.level = 0;
    this.board = this.getEmptyBoard();
    this.time = { start: 0, elapsed: 0, level: (LEVEL[0]) };
  }

  animate(now = 0) {
    this.time.elapsed = now - this.time.start;
    if (this.time.elapsed > this.time.level) {
      this.time.start = now;
      if (!this.drop()) {
        this.gameOver();
        return;
      }
    }
    this.draw();
    this.requestId = requestAnimationFrame(this.animate.bind(this));
  }

  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.piece.draw();
    this.drawBoard();
  }

  drop(): boolean {
    let p = this.moves[KEY.DOWN](this.piece);
    if (this.service.valid(p, this.board)) {
      this.piece.move(p);
    } else {
      this.freeze();
      this.clearLines();
      if (this.piece.y === 0) {
        return false;
      }
      this.piece = this.next;
      this.next = new Piece(this.ctx);
    }
    return true;
  }

  clearLines() {
    let lines = 0;
    this.board.forEach((row, y) => {
      if (row.every(value => value !== 0)) {
        lines++;
        this.board.splice(y, 1);
        this.board.unshift(Array(COLS).fill(0));

      }
    });

    if (lines > 0) {
      this.points += this.service.getLinesClearedPoint(lines, this.level);
      this.lines += lines;
      if (this.lines >= LINES_PER_LEVEL) {
        this.level++;
        this.lines -= LINES_PER_LEVEL;
        let index = this.level;
        this.time.level = LEVEL[index];
      }
    }
  }

  freeze() {
    this.piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.board[y + this.piece.y][x + this.piece.x] = value;

        }
      });
    });
  }

  drawBoard() {
    this.board.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = COLORS[value];
          this.ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  gameOver() {
      cancelAnimationFrame(this.requestId);
    this.ctx.fillRect(20, 20,150, 100);
    this.ctx.fillStyle = 'black';
    this.ctx.font = '1px Arial';
    this.ctx.fillStyle = 'red';
    
    var gameOverLine;
    if(this.points>this.best_score)
        {
          this.service.store(this.points);
          gameOverLine="Congrats! You WIN"
          this.best_score = this.points;
        }
      else{
        gameOverLine="Sorry! You Lose"
      }
    this.ctx.fillText(gameOverLine, 3, 4);
    

      }

  getEmptyBoard(): number[][] {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }
}



