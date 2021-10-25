import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrainTeaserDisplayQuizComponent } from './brain-teaser-display-quiz.component';

describe('BrainTeaserDisplayQuizComponent', () => {
  let component: BrainTeaserDisplayQuizComponent;
  let fixture: ComponentFixture<BrainTeaserDisplayQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrainTeaserDisplayQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrainTeaserDisplayQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
