import { TestBed } from '@angular/core/testing';
import { ExamEntity } from '../entities/exam.entity';
import { ExamRepository } from '../repository/exam.repository';
import { ExamUseCase } from './exam.usecase';
import { of } from 'rxjs';

describe('ExamUseCase', () => {
  let useCase: ExamUseCase;
  let examRepositorySpy: jasmine.SpyObj<ExamRepository>;

  const mockExams: ExamEntity[] = [
    {
      candidateName: 'Alice',
      location: 'Paris',
      date: '01-01-2025',
      time: '12:00',
      status: 'canselled',
    },
    {
      candidateName: 'Bob',
      location: 'Lyon',
      date: '02-01-2025',
      time: '14:00',
      status: 'confirmed',
    },
  ];
  beforeEach(() => {
    examRepositorySpy = jasmine.createSpyObj('ExamRepository', [
      'listOfExams',
      'createExam',
      'examsSignal'
    ]);

    TestBed.configureTestingModule({
      providers: [
        ExamUseCase,
        { provide: ExamRepository, useValue: examRepositorySpy },
      ],
    });

    useCase = TestBed.inject(ExamUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should load exams and set examsSignal', () => {
    examRepositorySpy.listOfExams.and.returnValue(of(mockExams));
    useCase.loadExams();
    expect(useCase.exams()).toEqual(mockExams);
  });

  it('should create a new exam and reload all exams', () => {
    const newExam: ExamEntity = {
      candidateName: 'Charlie',
      location: 'Marseille',
      date: '15-07-2025',
      time: '12:00',
      status: 'to organize',
    };
    
    examRepositorySpy.createExam.and.returnValue(of(newExam));
    examRepositorySpy.listOfExams.and.returnValue(of([...mockExams, newExam]));
   
    useCase.createNewExam(newExam).subscribe(() => {
        expect(examRepositorySpy.createExam).toHaveBeenCalledWith(newExam);
        expect(useCase.exams()).toEqual([...mockExams, newExam]);
      });

  });
});
