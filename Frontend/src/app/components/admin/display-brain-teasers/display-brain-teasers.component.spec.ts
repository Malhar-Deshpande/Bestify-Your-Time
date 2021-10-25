import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBrainTeasersComponent } from './display-brain-teasers.component';

describe('DisplayBrainTeasersComponent', () => {
  let component: DisplayBrainTeasersComponent;
  let fixture: ComponentFixture<DisplayBrainTeasersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayBrainTeasersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayBrainTeasersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
