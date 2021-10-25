import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-section',
  templateUrl: './game-section.component.html',
  styleUrls: ['./game-section.component.scss']
})
export class GameSectionComponent implements OnInit {

  pageNo:number=0


  constructor() { }

  ngOnInit(): void {
  }

  changePageNo(num:number){
    this.pageNo=num;
  }


}
