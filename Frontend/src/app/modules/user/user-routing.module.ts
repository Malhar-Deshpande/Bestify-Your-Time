import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameSectionComponent } from 'src/app/components/user/game/game-section/game-section.component';
import { SnakeGameComponent } from 'src/app/components/user/game/snake-game/snake-game.component';
import { CategoryListComponent } from 'src/app/components/user/quize/category-list/category-list.component';
import { DisplayQuizeComponent } from 'src/app/components/user/quize/display-quize/display-quize.component';
import { QuizeListComponent } from 'src/app/components/user/quize/quize-list/quize-list.component';
import { FavouriteQuizesComponent } from 'src/app/components/user/quize/favourite-quizes/favourite-quizes.component';
import { UserGuard } from 'src/app/guard/user.guard';
import { BrainTeaserDisplayQuizComponent } from 'src/app/components/user/quize/brain-teaser-display-quiz/brain-teaser-display-quiz.component';

const routes: Routes = [
  {path:'category',component:CategoryListComponent , canActivate:[UserGuard] },
  {path:'quiz-list',component:QuizeListComponent, canActivate:[UserGuard]},
  {path:'display-quize',component:DisplayQuizeComponent, canActivate:[UserGuard]},
  {path:'favouritesQuiz',component:FavouriteQuizesComponent, canActivate:[UserGuard]},
  {path:'dashboard',component:CategoryListComponent, canActivate:[UserGuard]},

  {path:'game',component:GameSectionComponent, canActivate:[UserGuard]},
  {path:'snake-game',component:SnakeGameComponent, canActivate:[UserGuard]},

  {path:'brain-teaser',component:BrainTeaserDisplayQuizComponent,canActivate:[UserGuard]}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
