import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from '../../components/admin/admin-dashboard/admin-dashboard.component';
import { CreateQuizComponent } from '../../components/admin/create-quiz/create-quiz.component';
import { CreateBrainTeaserComponent } from '../../components/admin/create-brain-teaser/create-brain-teaser.component';
import { AdminGuard } from 'src/app/guard/admin.guard';


const routes: Routes = [

  {path:'dashboard', component:AdminDashboardComponent , canActivate:[AdminGuard] },
  {path:'add-mcq-quiz', component:CreateQuizComponent , canActivate:[AdminGuard] },
  {path:'add-brain-teaser', component:CreateBrainTeaserComponent , canActivate:[AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
