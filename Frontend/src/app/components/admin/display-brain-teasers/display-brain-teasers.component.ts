import { Component, Input,OnInit,SimpleChanges } from '@angular/core';
import { ElementRef, OnChanges, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import {IMcqQuestionFormat} from '../../../model/mcq-question-format';

@Component({
  selector: 'app-display-brain-teasers',
  templateUrl: './display-brain-teasers.component.html',
  styleUrls: ["../../../../assets/BootstrapCSS/css/bootstrap.min.css",
  './display-brain-teasers.component.scss']
})
export class DisplayBrainTeasersComponent implements OnInit {

  referenceObject:IMcqQuestionFormat = {question_id:0,question: '',choice1: '',choice2: '',choice3: '',choice4: '',answer: '', quiz_id:0};

  @Input('brainTeaserQuestion') SINGLE_ELEMENT_DATA:IMcqQuestionFormat = this.referenceObject

  brainTeaserQuestions:IMcqQuestionFormat[] = [this.referenceObject]

  comparerObj:IMcqQuestionFormat = this.referenceObject;

  toEdit:boolean=false;
  arrayIndexToBeUpdated:number=0;
  
  showQuestion:IMcqQuestionFormat = this.referenceObject

  p: number = 1;
  count: number = 5;
  autoHidePagination:boolean=true
  //questionIdForUpdate:number = 
  constructor(private adminService:AdminService) {
    console.log("In constr of child component.....")
    this.compareQuestionObjects();
  }
  
  ngOnInit(): void {}

  // choices = [
  //   { value: 'a', viewValue: 'A' },
  //   { value: 'b', viewValue: 'B' },
  //   { value: 'c', viewValue: 'C' },
  //   { value: 'd', viewValue: 'D' },
  // ];

  ngOnChanges(changes: SimpleChanges) {
    console.log("Changes...." , changes)
    this.compareQuestionObjects();
    this.brainTeaserQuestions.push(this.SINGLE_ELEMENT_DATA)
  }
    

  ForUpdate(q: IMcqQuestionFormat, i:number)
  {

    this.showQuestion = q;
    console.log("For Update ",q)
    console.log("Number of question is  ",i)
    this.arrayIndexToBeUpdated = i;
    this.toEdit = true;
  }

  ForDelete(q: IMcqQuestionFormat, i: number) {

    // For pagination
    if(i%5 == 0)
    {
      this.p = this.p - 1
    }

    if(i == 0){
      this.adminService.isAdded = false;
    }

    this.adminService.brainTeaserQuestions.forEach((value, index) => {
      if (JSON.stringify(value) == JSON.stringify(q)) {
        this.adminService.brainTeaserQuestions.splice(index, 1);
      }
    });

    // this.adminService.mcqQuestions.forEach((value, index) => {
    //   if (JSON.stringify(value) == JSON.stringify(q)) {
    //     this.adminService.mcqQuestions.splice(index, 1);
    //   }
    // });

  }

  submitUpdatedQuestion(finalQ: IMcqQuestionFormat)
  {
    //console.log("Final Updated Object is : ", finalQ)
    this.toEdit = false
    this.showQuestion = finalQ
    this.adminService.brainTeaserQuestions[this.arrayIndexToBeUpdated]=finalQ
    this.brainTeaserQuestions[this.arrayIndexToBeUpdated] = finalQ
    console.log("UPDATED this.showQuestion is  ",this.showQuestion)
    this.compareQuestionObjects();
  }

  closeUpdateQuestionDialog()
  {
    this.toEdit = false
  }

  compareQuestionObjects()
  {
    console.log("Inside helper function......")
    this.brainTeaserQuestions.forEach((value,index)=>{
      if(JSON.stringify(value) == JSON.stringify(this.comparerObj)) 
      {
       this.brainTeaserQuestions.splice(index,1);
      }
  });
  }


}
