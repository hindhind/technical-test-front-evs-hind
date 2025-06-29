import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExamComponent } from './create-exam.component';
import { ExamUseCase } from '../../core/usecase/exam.usecase';
import { ExamRepository } from '../../core/repository/exam.repository';
import { of, throwError } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideHttpClient } from '@angular/common/http';
import { MESSAGES, SNACKBAR } from '../shared/constants';

describe('CreateExamComponent', () => {
  let component: CreateExamComponent;
  let fixture: ComponentFixture<CreateExamComponent>;
  let examUseCaseSpy: jasmine.SpyObj<ExamUseCase>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<CreateExamComponent>>;

  beforeEach(async () => {
    const spyExamUseCase = jasmine.createSpyObj('ExamUseCase', [
      'createNewExam',
    ]);
    spyExamUseCase.createNewExam.and.returnValue(of({}));

    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [CreateExamComponent, MatSnackBarModule],
      providers: [
        { provide: ExamUseCase, useValue: spyExamUseCase },
        { provide: MatDialogRef, useValue: mockDialogRef },
        provideHttpClient(),
        {
          provide: ExamRepository,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateExamComponent);
    component = fixture.componentInstance;
    examUseCaseSpy = TestBed.inject(ExamUseCase) as jasmine.SpyObj<ExamUseCase>;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have invalid form initially', () => {
    fixture.detectChanges();
    expect(component.examForm.invalid).toBeTrue();
  });

  it('should validate form', () => {
    fixture.detectChanges();
    component.examForm.setValue({
      name: 'ana',
      location: 'paris',
      date: new Date(),
      time: '12:00',
      status: 'confirmed',
    });
    expect(component.examForm.valid).toBeTrue();
  });

  it('should call  createNewExam on submit and show success snackbar', () => {
    fixture.detectChanges();
    component.examForm.setValue({
      name: 'ana',
      location: 'paris',
      date: new Date(),
      time: '12:00',
      status: 'confirmed',
    });
    spyOn(component, 'openSnackBar');

    component.createAnExam();
    expect(examUseCaseSpy.createNewExam).toHaveBeenCalled();
    expect(component.openSnackBar).toHaveBeenCalledWith(
      MESSAGES.EXAM_CREATION_SUCCESS,
      SNACKBAR.ACTION_OK,
      SNACKBAR.CLASS_SUCCESS
    );
  
  });

  it('should handle createNewExam error with snackbar', () => {
    examUseCaseSpy.createNewExam.and.returnValue(
      throwError(() => new Error('failure'))
    );
  
    component.examForm.setValue({
      name: 'Ana',
      location: 'Paris',
      date: new Date(),
      time: '12:00',
      status: 'confirmed'
    });
  
    spyOn(component, 'openSnackBar');
  
    component.createAnExam();
  
    expect(component.openSnackBar).toHaveBeenCalledWith(
      MESSAGES.EXAM_CREATION_SUCCESS,
      SNACKBAR.ACTION_OK,
      SNACKBAR.CLASS_SUCCESS
    );
  
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });

  it('should close dialog on success', async () => {
    fixture.detectChanges();
    component.examForm.setValue({
      name: 'Ana',
      location: 'paris',
      date: new Date(),
      time: '12:00',
      status: 'confirmed',
    });
    component.onSubmit();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });
});
