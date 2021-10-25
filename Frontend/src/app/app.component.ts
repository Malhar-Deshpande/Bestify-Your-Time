import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showHead:boolean=false

  ngOnInit(){}

  constructor(private router:Router)
  {
    router.events.forEach((event)=>{
      if(event instanceof NavigationStart){
        if(event['url']=='/login' || event['url']=='/signup' || event['url']=='/' ){
          this.showHead=false
        }
        else{
          console.log('in app comp dnt show header');
          this.showHead=true
        }
      }
    })


    sessionStorage.setItem('name','Megha')
  }

}
