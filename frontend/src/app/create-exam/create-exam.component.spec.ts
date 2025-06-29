import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExamComponent } from './create-exam.component';
import { ExamUseCase } from '../../core/usecase/exam.usecase';
import { ExamRepository } from '../../core/repository/exam.repository';
import { of } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

describe('CreateExamComponent', () => {
  let component: CreateExamComponent;
  let fixture: ComponentFixture<CreateExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateExamComponent],
       providers: [
              ExamUseCase,
              {
                provide: ExamRepository,
                useValue: {
                  listOfExams: () => of([]),
                  createExam: () => of({})
                }
              },
              {
                provide: MatDialogRef,
                useValue: {
                  close: jasmine.createSpy('close')
                }
              }
            ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
