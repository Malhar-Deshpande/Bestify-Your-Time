import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITopScorer } from 'src/app/model/top-score';
import { AdminService } from 'src/app/services/admin.service';
import { QuizeService } from 'src/app/services/quize.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  p: number = 1;  //Initial page number
  count: number = 4;  //Increment number
  autoHidePagination: boolean = true;


  constructor(private router:Router, private quizService:QuizeService, private adminService:AdminService) { }

  ngOnInit(): void {
    this.subCategories();
    this.getTopResults();
  }

  //Array for storing Topscores of current day
  SCORES:ITopScorer[] = []

  //Go to particular quiz category add page
  goToAddQuiz(categoryId:number)
  {
    sessionStorage.setItem('categoryIdToCreate',JSON.stringify(categoryId))
    this.router.navigate(['admin/add-mcq-quiz'])

    if(categoryId ===2 )
    {
      this.router.navigate(['admin/add-brain-teaser'])
    }

  }

  //Load subcategories on Init
  subCategories(){
    this.quizService.getSubCategories(3).subscribe(response => {
      if(response)
      {
        console.log("Quiz Sub categories are : ", response)
      }

      else{
        console.log("Sub categories Response Falied")
      }
  })
  }

  getTopResults(){
    this.adminService.onGetTopScores().subscribe(response => {
      if(response)
      {
        let a:any= response
        this.SCORES = a
      }

      else{
        console.log("Sub categories Response Falied")
      }
  })
  }

  
}
