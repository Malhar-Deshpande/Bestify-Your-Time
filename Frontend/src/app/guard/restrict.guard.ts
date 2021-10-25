import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RestrictGuard implements CanActivate {

  constructor(private userService : UserService,private router : Router,private location:Location)
  {
    
  }

  canActivate() : boolean
  {
    if(this.userService.loggedIn())
    {
      this.location.back();
      return false;
    }
    else
    {
      this.router.navigate(['']);
      return true;
    }
  }

}
