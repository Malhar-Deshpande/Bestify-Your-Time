import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizeListComponent } from './quize-list.component';

describe('QuizeListComponent', () => {
  let component: QuizeListComponent;
  let fixture: ComponentFixture<QuizeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
