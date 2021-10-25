import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayQuizeComponent } from './display-quize.component';

describe('DisplayQuizeComponent', () => {
  let component: DisplayQuizeComponent;
  let fixture: ComponentFixture<DisplayQuizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayQuizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayQuizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
