import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { IUser } from '../../user/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  user: IUser = {
    userId:0,
    name: '',
    username: '',
    email: 'this.signInForm.value.email',
    password: '',
    confirm_password: '',
    token:'',
    role:''
  };

  signInForm: FormGroup;

  hide = true;
  displayVal: any = [];
  data:any=[];
  @ViewChild('clearBtn') ClearBtnRef!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackbar:MatSnackBar
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email,
        Validators.pattern('[A-Za-z0-9._%+-]+@gmail.com$')]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }
  ngOnInit(): void {}

  
  onSignIn() {
    
    this.displayVal = [
      {
        email: this.signInForm.value.email,
        password: this.signInForm.value.password,
      }
    ];

    this.user = this.signInForm.value;
    
    this.userService.authenticateUser(this.user).subscribe(
      response => {

        this.data=response.body;
        sessionStorage.setItem('token',response.body?.token);
        sessionStorage.setItem('name',response.body?.name!);
        sessionStorage.setItem('role',response.body?.role!);
        sessionStorage['userId']=(this.data['user_id']);
    
        if(response.body?.role=="admin")
        {
          sessionStorage.setItem('token',response.body?.token);
          sessionStorage.setItem('admin-token',response.body?.token);
           this.router.navigate(['admin/dashboard']);

        }
        else if(response.body?.role=="user")
        {
          this.data=response.body;
          sessionStorage.setItem('token',response.body?.token);
          sessionStorage.setItem('user-token',response.body?.token);
          sessionStorage['userId']=this.data['userId']
          console.log("userId" ,sessionStorage['userId']);
          this.router.navigate(['user/category']);
        }
        else
        {
          this.router.navigate([''])
        }
        
      },
      error => {
        console.log(error);
        this.snackbar.open("Email or Password Incorrect!","OK",{duration:10000,verticalPosition:'top'});
        let el: HTMLElement = this.ClearBtnRef.nativeElement;
        el.click()

      }
    );
  }


}
