import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../user/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // role:string;
  // details:IUser;
  printname:string='';
  name:string=(sessionStorage.getItem('name')!);
  role:string=(sessionStorage.getItem('role')!)

  constructor(private router: Router,private userService: UserService) {
    
    //To display the user's and admin's initials on the header
    // this.role="admin";
    var index=0;
    var indicate=0;

    for( var val of this.name){
      console.log("in name chnger");
      
      if(index==0){
        this.name=val.toUpperCase();
      }
      if(indicate==1){
        this.printname += val.toUpperCase();
        indicate=0;
      }
      index++;
      if(val==' '){
        indicate=1;
      }
      
    }
   }
  
  ngOnInit(): void {
  }

 //logout functionality
  onLogout(){
    console.log("in logout");
    
    sessionStorage.removeItem('token');
    // sessionStorage.removeItem('name')

    this.router.navigate(['/'])
  }

}
