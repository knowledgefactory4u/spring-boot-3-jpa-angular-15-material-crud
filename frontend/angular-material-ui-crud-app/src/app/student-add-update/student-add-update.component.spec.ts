import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAddUpdateComponent } from './student-add-update.component';

describe('StudentAddUpdateComponent', () => {
  let component: StudentAddUpdateComponent;
  let fixture: ComponentFixture<StudentAddUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAddUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
