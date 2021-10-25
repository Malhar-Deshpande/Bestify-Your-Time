import { Component, OnInit, Input, Renderer2, ElementRef, ViewChild, Directive, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { IuserResponse, IQuestion, IScoreCard } from 'src/app/model/userResponse';
import { QuizeService } from 'src/app/services/quize.service';
import { Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';


@Component({
  selector: 'app-display-quize',
  templateUrl: './display-quize.component.html',
  styleUrls: ['./display-quize.component.scss']
})
export class DisplayQuizeComponent implements OnInit {

  userResponse: IuserResponse = { user_id: 0, question_id: 0, selected_ans: '', quiz_id: 0, remaining_time: 0, status: '', correct_ans: '', quize_time: 0, res_id: 0 };
  userResponseArray: IuserResponse[] = [];
  quize: IQuestion[] = [];
  isSubmitted: boolean = false;
  UserScore: IScoreCard = { user_id: 0, obtained_marks: 0, quiz_id: 0, total_marks: 0 };
  score: number = 0;
  totalMarks: number = 0;
  isSubmit: string = '';
  resumeQuiz: IuserResponse[] = [];
  count: number = 0;
  timeHide: boolean = false;
  quiz_title: string = '';

  @Input() quizTitle: any = [];
  @ViewChild("radio") radiobtn!: ElementRef;

  //userChoice:any;


  quiz_time: number = 0;


  constructor(
    private activatedRoute: ActivatedRoute, private router: Router,
    private location: LocationStrategy, private quizeService: QuizeService,
    private snackBar: MatSnackBar
  ) {
    // Disable Back buttom
    history.pushState(null, this.router.url);
    this.location.onPopState(() => {
      history.pushState(null, this.router.url);
    });
  }


  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.queryParams['id'];
    this.quizTitle = this.activatedRoute.snapshot.queryParams['quiz_name'];
    console.log("title", this.quizTitle)

    this.quizeService.getQuizTime(id).subscribe(response => {
      const res = JSON.stringify(response);
      this.quiz_time = (JSON.parse(res).quiz_time) * 60;
      this.examEnd();
    },
      error => {
        console.log(error);
      }
    );
    //   this.quiz_time=20;
    // this.examEnd();  
    //display the questions to user

    const user_id = sessionStorage['userId'];;
    this.quizeService.getQuestions(id).subscribe(response => {
      console.log(response)
      this.quize = <IQuestion[]>response;
      console.log("quize is", this.quize)
      this.UserScore.total_marks = this.quize.length
      this.quize.forEach(question => {
        const userRes: IuserResponse = <IuserResponse>{};
        userRes.quiz_id = question.quiz_id;
        userRes.question_id = question.question_id;
        userRes.status = 'wrong';
        userRes.selected_ans = '';
        userRes.remaining_time = 0;
        userRes.user_id = sessionStorage['userId'];;
        this.userResponseArray.push(userRes);
      });

      //for resume quize options will be autoselected
      this.quizeService.resumeTest(id, user_id).subscribe(response => {
        if (response) {
          console.log("Rsume test response", response);
          this.resumeQuiz = <IuserResponse[]>response;
          console.log("Resume quize is", this.resumeQuiz);
          if (this.resumeQuiz !== null && this.resumeQuiz !== undefined && this.resumeQuiz.length > 0) {
            this.userResponseArray = [];
            this.resumeQuiz.forEach(question => {
              const userRes: IuserResponse = <IuserResponse>{};
              userRes.quiz_id = question.quiz_id;
              userRes.question_id = question.question_id;
              userRes.status = question.status;
              userRes.selected_ans = question.selected_ans;
              userRes.remaining_time = this.quiz_time;
              userRes.user_id = question.user_id;
              userRes.correct_ans = question.correct_ans;
              this.userResponseArray.push(userRes);
            })
          }
        }
      })
    })
  }

  @HostListener("window:beforeunload", ["$event"]) async unloadHandler(event: Event) {
    let result = confirm("Changes you made may not be saved.");
    event.returnValue = false; // stay on same page
  }

  //check the of user against correct ans and increase the score
  checkAns(question: IQuestion, option: string) {
    this.userResponseArray.forEach(question1 => {
      if (question1.question_id === question.question_id) {
        question1.selected_ans = option;
        question1.question_id = question.question_id;
        this.userResponse.quiz_id = question.quiz_id;
        if (option === question.answer) {
          this.UserScore.quiz_id = question.quiz_id;
          question1.status = 'correct';
          this.score = this.score + 1;
        } else {
          question1.status = 'wrong';
        }
      }
    })
  }

  //if ans is wrong show cross icon  will active after submit
  isWrongAns(question: IQuestion): boolean {
    let flag1 = false;
    this.userResponseArray.forEach(question1 => {
      if (this.isSubmitted && question1.question_id === question.question_id) {
        if (question1.status === 'wrong' || question1.status === '') {
          flag1 = true;
        }
      }
    })
    return this.isSubmitted && flag1;
  }

  //if ans is correct show checkmark will active after submit
  isCorrectAns(question: IQuestion, option: string): boolean {
    let flag2 = false;
    this.userResponseArray.forEach(question1 => {
      if (this.isSubmitted && question1.question_id === question.question_id) {
        if (question.answer === option) {
          flag2 = true;
        }
      }
    })
    return this.isSubmitted && flag2;
  }
  //user answer sheet for that quize will be send to backend 
  onSave(time: number) {
    let timeInMin = ((time / 1000) / 60);
    this.isSubmitted = true;
    this.userResponseArray.forEach(element => {

      if (!element.remaining_time) {
        element.remaining_time = timeInMin
      }
    })
    console.log("on save backend", this.userResponseArray)
    this.quizeService.sendUserResponse(this.userResponseArray).subscribe(response => {
      if (response) {
        this.snackBar.open("Your response saved successfully!!!", "OK", { duration: 10000, verticalPosition: 'top' });
        this.router.navigate(['user/quiz-list'], { queryParams: { id: 1 } });
      } else {
        console.log("error");
      }
    })
  }

  //user score will be send to backend
  onSubmit() {
    this.isSubmitted = true;
    this.timeHide = true;
    this.isSubmit = "cssHeader";
    console.log("score is", this.score);
    this.UserScore.obtained_marks = this.score;
    this.UserScore.user_id = sessionStorage['userId'];;
    console.log(this.UserScore);
    this.quizeService.sendUserScore(this.UserScore).subscribe(response => {
      if (response) {
        console.log("response is", response);
      } else {
        console.log("error");
      }
    })
  }

  isChecked(index: number, option: string): boolean {
    if (this.resumeQuiz !== null &&
      this.resumeQuiz !== undefined &&
      this.resumeQuiz.length > 0 &&
      this.resumeQuiz[index] !== null &&
      this.resumeQuiz[index] !== undefined) {
      return this.resumeQuiz[index].selected_ans === option;
    }
    return false;
  }

  examEnd() {
    setTimeout(() => {
      if (this.isSubmitted === false) {
        const name = sessionStorage.getItem('name');
        alert(`Hiii... ${name} this Exam Ended`);
        this.onSubmit();
      }

    }, 1000 * this.quiz_time);



  }
  //Back button
  goToHome() {
    this.router.navigate(['user/quiz-list'], { queryParams: { id: 1 } });
  }
}
