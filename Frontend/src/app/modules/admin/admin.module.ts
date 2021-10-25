import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CreateBrainTeaserComponent } from 'src/app/components/admin/create-brain-teaser/create-brain-teaser.component';
import { CreateQuizComponent } from 'src/app/components/admin/create-quiz/create-quiz.component';
import { AdminDashboardComponent } from 'src/app/components/admin/admin-dashboard/admin-dashboard.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplayDataComponent } from 'src/app/components/admin/display-data/display-data.component';
import { AdminService } from 'src/app/services/admin.service';
import { AddCategoryDialogComponent } from 'src/app/components/admin/add-category-dialog/add-category-dialog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DisplayBrainTeasersComponent } from 'src/app/components/admin/display-brain-teasers/display-brain-teasers.component';
@NgModule({
  declarations: [AdminDashboardComponent,CreateQuizComponent,CreateBrainTeaserComponent,DisplayDataComponent, AddCategoryDialogComponent,
    DisplayBrainTeasersComponent,
    CreateBrainTeaserComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers:[AdminService,NgxPaginationModule, DatePipe],
  exports:[AdminDashboardComponent,CreateQuizComponent,CreateBrainTeaserComponent, DisplayDataComponent, 
    AddCategoryDialogComponent, DisplayBrainTeasersComponent, CreateBrainTeaserComponent]
})
export class AdminModule { }
