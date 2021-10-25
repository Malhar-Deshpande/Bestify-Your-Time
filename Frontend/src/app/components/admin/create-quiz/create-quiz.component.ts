import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';
import { QuizeService } from 'src/app/services/quize.service'; 
import {AbstractControl, ValidatorFn} from '@angular/forms';
import { IAdminMcqQuestion } from 'src/app/model/admin-mcq-question';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ["../../../../assets/BootstrapCSS/css/bootstrap.min.css",
  './create-quiz.component.scss'],
})
export class CreateQuizComponent implements OnInit {

  isSubmitted:boolean = false
  newCategoryName:string = ''
  selectedCategoryId:number=0;
  storeSubCategories:any = []
  quizNameArray:string[] = []
  @ViewChild('clearBtn') ClearBtnRef!: ElementRef;

  addQuizForm:FormGroup

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, 
    private adminService:AdminService, public dialog: MatDialog,
    private quizService:QuizeService) {
    this.selectedCategoryId = parseInt(sessionStorage.getItem('categoryIdToCreate')!);
    this.addQuizForm = this.fb.group({
      quizCategory: ['', Validators.required],
      quizName: ['', [Validators.required, this.QuizNameValidator()]],
      quizTime: [, [Validators.required, Validators.min(4)]],
      questionsSubGroup: this.fb.group({
        question: ['', [Validators.required,this.QuizQuestionValidator()]],
        choice1: ['', Validators.required],
        choice2: ['', Validators.required],
        choice3: ['', Validators.required],
        choice4: ['', Validators.required],
        answer: ['', Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    this.compareQuestionObjects();
    this.populateSubCategory(this.selectedCategoryId)
    this.getAllQuizNames();
  }

  // Final object, that will be populated on submit and sent to backend via POST method
  mcqQuiz: IAdminMcqQuestion = {
    quizName: '',
    quizTime: 0,
    quizCategory: 1,
    questions: [],
  };

  // Used only for validation purpose for not adding duplicate questions
  mcqQuestions: string[] = [];


  getErrorMessageForTime() {
    if (this.quizTime?.hasError('required')) {
      return 'You must enter a value';
    }
    else{
      return 'Value should be greater than 5'
    }
  }

  getErrorMessageForQuizName()
  {
    if (this.quizNameArray.includes(this.quizName?.value))
    {
      return `Quiz Name ${this.quizName?.value} Already exists`
    }

    else return "Name is required"
  }

  getErrorMessageForQuizQuestion()
  {
    if (this.mcqQuestions.includes(this.question?.value))
    {
      return "Question already added"
    }

    else return "Question is required"
  }

  choices = [
    { value: 'a', viewValue: 'A' },
    { value: 'b', viewValue: 'B' },
    { value: 'c', viewValue: 'C' },
    { value: 'd', viewValue: 'D' },
  ];

  get quizCategory() {
    return this.addQuizForm.get('quizCategory');
  }

  get quizName() {
    return this.addQuizForm.get('quizName');
  }

  get quizTime() {
    return this.addQuizForm.get('quizTime');
  }

  //Get the whole question along with answers
  get questions() {
    return this.addQuizForm.get('questionsSubGroup');
  }

  //Get ONLY question
  get question() {
    return this.addQuizForm.get('questionsSubGroup.question');
  }

  get AdminService(){
    return this.adminService
  }

  // Add question in adminService array after click on Add button
  addQuestion() {
    this.adminService.isAdded = true
    this.mcqQuestions.push(this.question?.value)
    this.compareQuestionObjects()
    this.adminService.mcqQuestions.push(this.questions?.value);
    this.questions?.reset();
  }

  //
  submitQuiz() {
    this.updateFormValues();

    this.adminService.onSubmitQuiz(this.mcqQuiz).subscribe(response => {
      if(response)
      {
        this.isSubmitted = true;
        this.adminService.isAdded = false;
        this._snackBar.open("Quiz Added Successfully!!!","OK",{ verticalPosition: 'top',duration: 5000});
        this.adminService.mcqQuestions = [];
        let el: HTMLElement = this.ClearBtnRef.nativeElement;
        el.click()
      }
      else{
        this._snackBar.open("Operation Unsuccessful");
      }
    })
  }

  // Helper function for comparing objects within mcqQuestion ARRAY
  compareQuestionObjects() {
    this.adminService.mcqQuestions.forEach((value, index) => {
      if (JSON.stringify(value) == JSON.stringify(this.adminService.referenceObject)) {
        this.adminService.mcqQuestions.splice(index, 1);
      }
    });
  }

  //Update form values when quiz is submitted
  updateFormValues()
  {
    this.mcqQuiz.quizName = this.quizName?.value;
    this.mcqQuiz.quizCategory = this.quizCategory?.value;
    this.mcqQuiz.quizTime = this.quizTime?.value;
    this.mcqQuiz.questions = this.adminService.mcqQuestions;
  }

  //Open dialog for add category
  openDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      width: '250px',
      data: {newCategoryName: this.newCategoryName}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newCategoryName = result;
    });
    
  }

  SelectValue(selectedValue:number)
  {
    if(selectedValue === 100)
    {
      this.openDialog();
    }
  }

  //Populate the sub category array
  populateSubCategory(catId:number)
  {
    this.quizService.getSubCategories(catId).subscribe(response => {
      if(response)
      {
        this.storeSubCategories = response
      }

      else{
        console.log("Sub categories Response Falied")
      }
  })
  }

  getAllQuizNames()
  {
    this.adminService.onGetAllQuizNames().subscribe(response => {
      if(response)
      {
        let arr: any
        let str:any
        arr = response
        arr.forEach((element: any) => {
          this.quizNameArray.push(element.quiz_name)
        });
      }
      else{
        console.log("Fetching quiz Names Failed")
      }
    })
  }

    QuizNameValidator(): ValidatorFn {  
      return (control: AbstractControl): ValidationErrors | null =>  
      this.quizNameArray.includes(control.value) ? {nameExists:true} : null;
  }
  
  QuizQuestionValidator(): ValidatorFn {  
    return (control: AbstractControl): ValidationErrors | null =>  
    this.mcqQuestions.includes(control.value) ? {questionExists:false} : null;
}
}
