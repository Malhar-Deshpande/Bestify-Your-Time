import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { BoardComponent } from './block-game-board/block-game-board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from '@angular/material/card';
import { SnakeGameComponent } from './snake-game/snake-game.component';
import { GameSectionComponent } from './game-section/game-section.component';

@NgModule({
  declarations: [
    BoardComponent,
    SnakeGameComponent,
    GameSectionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  exports: [
    SnakeGameComponent
  ],
  providers: [],
  bootstrap: []
})
export class GameModule { }

