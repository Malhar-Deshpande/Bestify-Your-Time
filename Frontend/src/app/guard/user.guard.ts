import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { UserService } from '../services/user.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
 
  constructor(private userService : UserService,private router : Router ,private location : Location)
  {

  }
  
   
  canActivate() : boolean
  {
    if(this.userService.userLoggedIn())
    {
      return true;
    }
    else
    {
      this.location.back();
      return false;
    }
  }
 
}
