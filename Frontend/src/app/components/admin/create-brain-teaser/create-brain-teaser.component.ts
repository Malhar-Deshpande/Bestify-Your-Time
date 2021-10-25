import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMcqQuestionFormat } from '../../../model/mcq-question-format';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin.service';
import { MatDialog } from '@angular/material/dialog';
// import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';
import { QuizeService } from 'src/app/services/quize.service';
import { IBrainTeaser } from 'src/app/model/brain-teaser';

@Component({
  selector: 'app-create-brain-teaser',
  templateUrl: './create-brain-teaser.component.html',
  styleUrls: ['./create-brain-teaser.component.scss']
})
export class CreateBrainTeaserComponent implements OnInit {

  isAdded:boolean = false;
  isSubmitted:boolean = false
  // newCategoryName:string = ''
  // selectedCategoryId:number=0;
  // storeSubCategories:any = []
  @ViewChild('clearBtn') ClearBtnRef!: ElementRef;

  addBrainTeaserForm:FormGroup
  quizNameArray: string[]=[];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, 
    private adminService:AdminService, public dialog: MatDialog,
    private quizService:QuizeService) {
    // this.selectedCategoryId = parseInt(sessionStorage.getItem('categoryIdToCreate')!);
    this.addBrainTeaserForm = this.fb.group({
      quizName: ['', Validators.required],
      questionsSubGroup: this.fb.group({
        question: ['', Validators.required],
        answer: ['', Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    this.compareQuestionObjects();
    // this.populateSubCategory(this.selectedCategoryId)
  }

  referenceObject:IMcqQuestionFormat = {question_id:0,question: '',choice1: '',choice2: '',choice3: '',choice4: '',answer: '', quiz_id:0};
  
  // Used as Input() for child element
  brainTeaserchildObj: IMcqQuestionFormat = this.referenceObject
  showQuestion:IMcqQuestionFormat = this.referenceObject
  // Final object, that will be populated on submit and sent to backend via POST method
  brainTeaserQuiz: IBrainTeaser = {
    quizName: '',
    quizTime:0,
    quizCategory:1,
    questions: [],
  };

  // Array of questions. Questions will be pushed in this array when Admin clicks on Add button
  brainTeaserQuestions: IMcqQuestionFormat[] = [
    this.referenceObject,
  ];


  get quizName() {
    return this.addBrainTeaserForm.get('quizName');
  }

 

  get questions() {
    return this.addBrainTeaserForm.get('questionsSubGroup');
  }

  addQuestion() {
    this.isAdded = true
    this.compareQuestionObjects()
    this.brainTeaserchildObj = this.questions?.value;
    this.adminService.brainTeaserQuestions.push(this.questions?.value);
    this.questions?.reset();
  }

  submitBrainTeaser() {
    
    this.adminService.brainTeaserQuestions.push(this.questions?.value);
    this.compareQuestionObjects()
    this.brainTeaserchildObj = this.questions?.value;
    this.updateFormValues();
    // this.compareQuestionObjects()
   
    console.log('Values in OBJECT to be sent are ', this.brainTeaserQuiz);

    this.adminService.onSubmitBrainTeaser(this.brainTeaserQuiz).subscribe(response => {
      if(response)
      {
        this.isSubmitted = true;
        this.isAdded = false;
        this.snackBar.open("Quiz Added Successfully!!!","OK",{duration: 10000,verticalPosition:'top'});
        this.brainTeaserQuestions = [];
        let el: HTMLElement = this.ClearBtnRef.nativeElement;
        el.click()
      }
      else{
        this.snackBar.open("Operation Unsuccessful","OK",{duration: 2000,verticalPosition:'top'});
      }
    })
  }

  getErrorMessageForQuizName()
  {
    if (this.quizNameArray.includes(this.quizName?.value))
    {
      return `Quiz Name ${this.quizName?.value} Already exists`
    }

    else return "Name is required"
  }
  // Helper function for comparing objects within mcqQuestion ARRAY
  compareQuestionObjects() {
    console.log('Inside compareQuestionObjects function......');
    console.log('Reference Object value is ' , this.referenceObject);
    this.adminService.brainTeaserQuestions.forEach((value, index) => {
      console.log('Value is ' + JSON.stringify(value));

      if (JSON.stringify(value) == JSON.stringify(this.referenceObject)) {
        console.log('Value Matched');
        this.adminService.brainTeaserQuestions.splice(index, 1);
      }
    });
  }

  updateFormValues()
  {
    this.brainTeaserQuiz.quizName = this.quizName?.value;
    this.brainTeaserQuiz.questions = this.adminService.brainTeaserQuestions;
  }

  // openDialog(): void {
  //   console.log("Dialog opened.....")
  //   const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
  //     width: '250px',
  //     data: {newCategoryName: this.newCategoryName}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.newCategoryName = result;
  //     console.log("New Category AFTER RESULT IS : " + this.newCategoryName)
  //   });
    
  // }

 

  

}
