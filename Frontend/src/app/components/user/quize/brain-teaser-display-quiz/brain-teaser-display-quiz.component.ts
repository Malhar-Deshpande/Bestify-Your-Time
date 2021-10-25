import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizeService } from 'src/app/services/quize.service';

@Component({
  selector: 'app-brain-teaser-display-quiz',
  templateUrl: './brain-teaser-display-quiz.component.html',
  styleUrls: ['./brain-teaser-display-quiz.component.scss']
})
export class BrainTeaserDisplayQuizComponent implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute,
    private quizeService:QuizeService,
  ) { }

  ngOnInit(): void {
    const id=this.activatedRoute.snapshot.queryParams['id'];
    this.quizeService.getQuestions(id).subscribe(response=>{
      console.log("response of brain teaser",response)

    })
  

  }
}