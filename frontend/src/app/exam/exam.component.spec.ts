import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamComponent } from './exam.component';
import { ExamUseCase } from '../../core/usecase/exam.usecase';
import { ExamRepository } from '../../core/repository/exam.repository';
import { of } from 'rxjs';

describe('ExamComponent', () => {
  let component: ExamComponent;
  let fixture: ComponentFixture<ExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamComponent],
      providers: [
        ExamUseCase,
        {
          provide: ExamRepository,
          useValue: {
            listOfExams: () => of([]),
            createExam: () => of({})
          }
        }
      ]
     
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamComponent);
    component = fixture.componentInstance;
    
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
