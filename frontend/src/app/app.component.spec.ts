import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ExamUseCase } from '../core/usecase/exam.usecase';
import { ExamRepository } from '../core/repository/exam.repository';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
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
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

 
});
