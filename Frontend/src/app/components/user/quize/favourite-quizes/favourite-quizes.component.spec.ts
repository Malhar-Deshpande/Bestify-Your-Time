import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteQuizesComponent } from './favourite-quizes.component';

describe('FavouriteQuizesComponent', () => {
  let component: FavouriteQuizesComponent;
  let fixture: ComponentFixture<FavouriteQuizesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteQuizesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteQuizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
