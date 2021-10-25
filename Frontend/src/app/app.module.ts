import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";
import { SignInComponent } from './components/login/sign-in/sign-in.component';
import { SignUpComponent } from './components/login/sign-up/sign-up.component';
import { MaterialModule } from './modules/material/material.module';

import { BoardComponent } from './components/user/game/block-game-board/block-game-board.component';
import { SnakeGameComponent } from './components/user/game/snake-game/snake-game.component';

import { HttpClientModule } from '@angular/common/http';
import { BestScoreManager } from './components/user/game/snake-game/snake-game.storage.service';
import { GameSectionComponent } from './components/user/game/game-section/game-section.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { UserModule } from './modules/user/user.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    BoardComponent,
    SnakeGameComponent,
    GameSectionComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    RxReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    BestScoreManager
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
