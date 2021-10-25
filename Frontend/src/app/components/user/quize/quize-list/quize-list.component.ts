import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizeService } from 'src/app/services/quize.service';
import {Router}from '@angular/router'
import { IFavouriteQuiz } from 'src/app/model/favoriteQuiz';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IMcqQuestion } from 'src/app/model/mcq-question';

@Component({
  selector: 'app-quize-list',
  templateUrl: './quize-list.component.html',
  styleUrls: ['./quize-list.component.scss']
})
export class QuizeListComponent implements OnInit {
  isResume:boolean=false;
  quiz:IMcqQuestion={quiz_id:0,quizCategory:0,quiz_name:'',quizTime:0,questions:[]}
  quizes:IMcqQuestion[]=[];
  quizeTitle:string='';
  favouriteQuiz:IFavouriteQuiz={user_id:0,quiz_id:0,quiz_name:''};
  isFavourite:boolean=false;
  isRemove:boolean=true;
  constructor(
      private activatedRoute:ActivatedRoute,private _snackBar: MatSnackBar, 
      private quizeService:QuizeService,private snackBar: MatSnackBar,
      private router :Router
  ) { }

  ngOnInit(): void {
   
    const id=this.activatedRoute.snapshot.queryParams['id']
    this.quizeService.getQuizes(id).subscribe(response=>{
      console.log("Quize list is :")
      console.log("response is",response);
      this.quizes=<IMcqQuestion[]>response;
      console.log("data from backend",this.quizes)

    })
   
  }

  displayQuize(quiz:IMcqQuestion){

    this.router.navigate(['user/display-quize'],{queryParams:{id:quiz['quiz_id'],quiz_name:quiz['quiz_name']}});
  }

 
  addTofavourite(quiz:IMcqQuestion){
    this.favouriteQuiz.quiz_id=quiz['quiz_id'];
    this.favouriteQuiz.user_id=sessionStorage['userId'];
    this.isFavourite=true;
    console.log("fav quiz",this.favouriteQuiz);
  
    this.quizeService.addTofavourite(this.favouriteQuiz).subscribe(response=>{
      if(response){
        this.snackBar.open("Quiz added to Favourites!!!","OK",{duration: 10000,verticalPosition:'top'});
        console.log("respone for fav is",response);
       
      }else{
        this._snackBar.open("Operation Unsuccessful");
      }
    })
  }

  
}
