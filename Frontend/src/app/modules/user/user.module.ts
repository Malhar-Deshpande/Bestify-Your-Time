import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { DisplayQuizeComponent } from 'src/app/components/user/quize/display-quize/display-quize.component';
import { CategoryListComponent } from 'src/app/components/user/quize/category-list/category-list.component';
import { QuizeListComponent } from 'src/app/components/user/quize/quize-list/quize-list.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule} from '@angular/forms';
import { CountdownModule } from 'ngx-countdown';
import { FavouriteQuizesComponent } from '../../components/user/quize/favourite-quizes/favourite-quizes.component';
import { BrainTeaserDisplayQuizComponent } from 'src/app/components/user/quize/brain-teaser-display-quiz/brain-teaser-display-quiz.component';




console.warn("User Module Loaded")

@NgModule({
  declarations: [DisplayQuizeComponent,CategoryListComponent,QuizeListComponent,FavouriteQuizesComponent,BrainTeaserDisplayQuizComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FormsModule,
    CountdownModule
  ],
  exports:[DisplayQuizeComponent,CategoryListComponent,QuizeListComponent,FavouriteQuizesComponent,BrainTeaserDisplayQuizComponent]
})
export class UserModule { }
