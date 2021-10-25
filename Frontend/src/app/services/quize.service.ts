import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { IQuestion, IScoreCard, IuserResponse } from '../model/userResponse';
import { IFavouriteQuiz } from '../model/favoriteQuiz';

@Injectable({
  providedIn: 'root'
})
export class QuizeService {
 
    constructor(public http:HttpClient) { }
    url='http://localhost:8080';

  
  getQuizTime(quiz_id:number){
    console.log("Quiz service id   :   ",quiz_id);
    const httpHeader={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
   const request=this.http.get(this.url+"/quizbypk/"+quiz_id,httpHeader);
    return request; 
  }

  getCategory(){
    console.log("inside category");
    const httpHeader={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    const request=this.http.get(this.url+"/category",httpHeader);
    return request;
  }

  getAllSubCategories(){
    console.log("inside get subcaegories");
    const httpHeader={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    //const request=this.http.get(this.url+"/subcategory?id="+id,httpHeader);
    const request=this.http.get(this.url+"/allsubcategory/",httpHeader);
    return request;

  }


  getSubCategories(id:number) {
    console.log("inside get subcaegories");
    const httpHeader={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    //const request=this.http.get(this.url+"/subcategory?id="+id,httpHeader);
    const request=this.http.get(this.url+"/subcategory/"+id,httpHeader);
    return request;
    
  }
  getQuestions(id:number){
    console.log("inside service");
    const httpHeader={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    //question/:id"
    const request=this.http.get(this.url+"/question/"+id,httpHeader);
    
    //const request=this.http.get(this.url+"/question?id="+id,httpHeader);
    return request;
  }
  resumeTest(id:number,user_id:number){
    console.log("inside resume test");
    const httpHeader={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    //app.route("/response/:quiz_id/:user_id").get(this.responseController.GET);
    const request=this.http.get(this.url+"/response/"+id+"/"+user_id,httpHeader);
    
    //const request=this.http.get(this.url+"/question?id="+id,httpHeader);
    return request;

  }

  getQuizes(subcat_id: any) {
    console.log("inside get quizes");
    const httpHeader={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    const request=this.http.get(this.url+"/quiz/"+subcat_id,httpHeader);
    return request;
  }

  sendUserResponse(userResponse:IuserResponse[]){
    console.log('sending user response to backend')
    const httpHeader={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    console.log("response send to backend",userResponse);
    const request=this.http.post(this.url+"/response/",userResponse,httpHeader);
    return request;
  }

  sendUserScore(UserScore: IScoreCard) {
    console.log('send userscore to backend');
    const httpHeader={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    const request=this.http.post(this.url+"/result",UserScore,httpHeader);
    return request;
  }

  addTofavourite(favouriteQuiz: IFavouriteQuiz) {
    console.log('send favourite quize to backend');
    const httpHeader={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    const request=this.http.post(this.url+"/favourite",favouriteQuiz,httpHeader);
    return request;
  }

  removeFavQuize(id:number) {
    console.log('in service:remove fav');
    const httpHeader={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    const request=this.http.delete(this.url+"/delete/"+id,httpHeader);
    return request;
    
  }

  getFavQuizes(id: any) {
    console.log('in service:get fav');
    const httpHeader={
      headers:new HttpHeaders({
        token:sessionStorage['token']
      })
    }
    const request=this.http.get(this.url+"/favourite",httpHeader);
    return request;

  }



}
