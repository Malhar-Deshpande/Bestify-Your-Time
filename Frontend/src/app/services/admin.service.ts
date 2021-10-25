import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMcqQuestionFormat } from '../model/mcq-question-format';
import { IBrainTeaser } from '../model/brain-teaser';
import { IAdminMcqQuestion } from '../model/admin-mcq-question';
@Injectable({
  providedIn: 'root'
})

export class AdminService {

  // To show the added question table
  isAdded:boolean = false;

  constructor(private httpClient:HttpClient) {
    this.compareQuestionObjects();
   }
  
  referenceObject:IMcqQuestionFormat = {question_id:0,question: '',choice1: '',choice2: '',choice3: '',choice4: '',answer: '', quiz_id:0};

  mcqQuestions: IMcqQuestionFormat[] = [
    this.referenceObject,
  ];

  brainTeaserQuestions:IMcqQuestionFormat[]=[
    this.referenceObject,
  ];

  url = 'http://localhost:8080/quiz';

  onSubmitQuiz(objToSend:IAdminMcqQuestion)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    };
    console.log("Sending this object ", objToSend)

    return this.httpClient.post(this.url, objToSend, httpOptions)
  }



  onGetAllQuizNames()
  { 
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    };
     
    return this.httpClient.get("http://localhost:8080/all-quiz",httpOptions)
  }
  
 onSubmitBrainTeaser(objToSend:IBrainTeaser)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    };
    console.log("Sending this object ", objToSend)

    return this.httpClient.post(this.url, objToSend, httpOptions)
  }

  onGetTopScores()
  { 
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    };
     
    return this.httpClient.get("http://localhost:8080/allresult",httpOptions)
  }
  

  compareQuestionObjects() {
    console.log('Inside helper function......');
    this.mcqQuestions.forEach((value, index) => {
      if (JSON.stringify(value) == JSON.stringify(this.referenceObject)) {
        this.mcqQuestions.splice(index, 1);
      }
    });
  }
}
