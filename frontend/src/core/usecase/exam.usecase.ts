import { Observable, tap } from 'rxjs';
import { ExamRepository } from '../repository/exam.repository';
import { ExamEntity } from '../entities/exam.entity';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExamUseCase {
  private examsSignal = signal<ExamEntity[]>([]);
  exams = this.examsSignal.asReadonly();

  constructor(private examRepositoryInterface: ExamRepository) {}

  loadExams(): void {
    this.examRepositoryInterface
      .listOfExams()
      .subscribe((exams) => this.examsSignal.set(exams));
  }

  createNewExam(newExam: ExamEntity): Observable<ExamEntity> {
    return this.examRepositoryInterface
      .createExam(newExam)
      .pipe(tap(() => this.loadExams()));
  }
}
