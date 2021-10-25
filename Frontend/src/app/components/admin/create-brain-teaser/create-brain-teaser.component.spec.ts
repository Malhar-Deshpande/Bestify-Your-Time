import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBrainTeaserComponent } from './create-brain-teaser.component';

describe('CreateBrainTeaserComponent', () => {
  let component: CreateBrainTeaserComponent;
  let fixture: ComponentFixture<CreateBrainTeaserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBrainTeaserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBrainTeaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
