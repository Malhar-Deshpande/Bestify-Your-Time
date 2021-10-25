import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { IFavouriteQuiz } from '../../../../model/favoriteQuiz';
import {QuizeService} from '../../../../services/quize.service'

@Component({
  selector: 'app-favourite-quizes',
  templateUrl: './favourite-quizes.component.html',
  styleUrls: ['./favourite-quizes.component.scss']
})
export class FavouriteQuizesComponent implements OnInit {

  favQuiz:IFavouriteQuiz={quiz_id:0,quiz_name:'',user_id:0};
  favQuizes:IFavouriteQuiz[]=[];
  isFavourite:boolean=true;

  constructor(
    private quizeService:QuizeService,
    private router :Router
  ) {
    
   }

  ngOnInit(): void {

   // alert("inside fav")
    const id=sessionStorage['userId'];
    console.log("id",id)
    this.quizeService.getFavQuizes(id).subscribe(response=>{
      console.log("Fav list is",response);
      this.favQuizes=<IFavouriteQuiz[]>response;
      console.log("data from backend",this.favQuizes)

    })
  }
  

  RemoveFromFavourite(id:number){
   this.quizeService.removeFavQuize(id).subscribe(response=>{
     if(response){
       console.log("removed")
     }else{
       console.log("unsuccessful")
     }

   })
    
  }
 

  displayQuize(quiz:any){
    this.router.navigate(['user/display-quize'],{queryParams:{id:quiz['quiz_id']}});
  }

}
