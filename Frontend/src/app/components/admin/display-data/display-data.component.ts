import { ElementRef, OnChanges, ViewChild } from '@angular/core';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { IMcqQuestionFormat } from '../../../model/mcq-question-format';

@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: [
    '../../../../assets/BootstrapCSS/css/bootstrap.min.css',
    './display-data.component.scss',
  ],
})
export class DisplayDataComponent implements OnInit, OnChanges {

  comparerObj: IMcqQuestionFormat = this.adminService.referenceObject;

  toEdit: boolean = false;
  arrayIndexToBeUpdated: number = 0;

  //It is bind to Update form
  showQuestion: IMcqQuestionFormat = this.adminService.referenceObject;

  p: number = 1;
  count: number = 5;
  autoHidePagination: boolean = true;
  //questionIdForUpdate:number =
  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {}

  get AdminService(){
    return this.adminService
  }
  
  choices = [
    { value: 'a', viewValue: 'A' },
    { value: 'b', viewValue: 'B' },
    { value: 'c', viewValue: 'C' },
    { value: 'd', viewValue: 'D' },
  ];

  ngOnChanges(changes: SimpleChanges) {
    this.compareQuestionObjects();
  }

  //q is the question which is to be updated
  ForUpdate(q: IMcqQuestionFormat, i: number) {
    this.showQuestion = q;
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

    this.adminService.mcqQuestions.forEach((value, index) => {
      if (JSON.stringify(value) == JSON.stringify(q)) {
        this.adminService.mcqQuestions.splice(index, 1);
      }
    });

  }

  // Called after update clicked on dialog box
  submitUpdatedQuestion(finalQ: IMcqQuestionFormat) {
    this.toEdit = false;
    this.showQuestion = finalQ;
    this.adminService.mcqQuestions[this.arrayIndexToBeUpdated] = finalQ;
  }

  closeUpdateQuestionDialog() {
    this.toEdit = false;
  }

  compareQuestionObjects() {
    this.adminService.mcqQuestions.forEach((value, index) => {
      if (JSON.stringify(value) == JSON.stringify(this.comparerObj)) {
        this.adminService.mcqQuestions.splice(index, 1);
      }
    });
  }
}
