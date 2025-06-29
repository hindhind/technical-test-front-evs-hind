import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamComponent } from './exam.component';
import { ExamUseCase } from '../../core/usecase/exam.usecase';
import { of } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { signal, Signal } from '@angular/core';
import { ExamEntity } from '../../core/entities/exam.entity';
class FakeExamUseCase {
  exams = signal<ExamEntity[]>([]);
  loadExams = jasmine.createSpy('loadExams');
}


describe('ExamComponent', () => {
  let component: ExamComponent;
  let fixture: ComponentFixture<ExamComponent>;
  let fakeExamUseCase: FakeExamUseCase;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    fakeExamUseCase = new FakeExamUseCase();

    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    await TestBed.configureTestingModule({
   

      imports: [ExamComponent, MatDialogModule],
      providers: [
        { provide: ExamUseCase, useValue: fakeExamUseCase },
        { provide: MatDialog, useValue: dialogSpy },
        provideHttpClient(),
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


  it('should call loadExams on ngOnInit', () => {
    component.ngOnInit();
    expect(fakeExamUseCase.loadExams).toHaveBeenCalled();
  });

  it('should open dialog when openNewExamModal is called', () => {
    component.openNewExamModal();
    expect(dialogSpy.open).toHaveBeenCalled();
  });

  it('should render a mat-spinner if no exams are present', () => {
    fakeExamUseCase.exams.set([]);
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector('mat-spinner');
    expect(spinner).toBeTruthy();
  });
});
