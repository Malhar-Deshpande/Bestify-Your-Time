import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from "../../user/user";
import { UserService } from 'src/app/services/user.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user:IUser={name:'',username:'',email:'',password:'',confirm_password:'', token:'',userId:0,role:''}
  hide=true;
  
  displayVal: any = [];
  signUpForm:FormGroup;
  @ViewChild('clearBtn') ClearBtnRef!: ElementRef;
  
  constructor(
    private formbuilder:FormBuilder,
    private userService:UserService,
    private snackbar:MatSnackBar
    ) 
  {
    this.signUpForm=this.formbuilder.group({
      name:['',Validators.required],
      username:['',Validators.required],
      email:['',
      [Validators.required,Validators.email,
        Validators.pattern('[A-Za-z0-9._%+-]+@gmail.com$')]
      ],
      password:['',
      [Validators.required,
      Validators.pattern('(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&^+=]).*$')]],
      confirm_password:['',
      [
        Validators.required,
        RxwebValidators.compare({fieldName:'password'})
      ]]
    })

  }
    
  ngOnInit(): void {
   
  }

  getName(){
    return this.signUpForm.get('name');
  }
  getUserName(){
    return this.signUpForm.get('username');
  }
  getEmail(){
    return this.signUpForm.get('email');
  }
  getPassword(){
    return this.signUpForm.get('password');
  }
  getConfirmPassword(){
    return this.signUpForm.get('confirm_password');
  }

  onSignUp(){
    this.displayVal = [
      {
        name:this.signUpForm.value.name,
        username:this.signUpForm.value.username,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password,
        confirm_password: this.signUpForm.value.confirm_password,
      }
    ];
    this.user=this.signUpForm.value;
    
    
    this.userService.addUser(this.user).subscribe(
      response => 
      {
        this.snackbar.open("Registered Successfully!","OK",{duration:10000,verticalPosition:'top'});
        let el: HTMLElement = this.ClearBtnRef.nativeElement;
        el.click()
      },
      error =>
      {
        console.log(error);
        this.snackbar.open("Registration Failed!","OK",{duration:10000,verticalPosition:'top'});
      }
    )
  }

 
}
