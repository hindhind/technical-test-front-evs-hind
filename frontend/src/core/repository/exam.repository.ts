import { Observable } from "rxjs/internal/Observable";
import { ExamEntity } from "../entities/exam.entity";

export abstract class ExamRepository {
    abstract listOfExams(): Observable<ExamEntity[]>;
    abstract  createExam(exam: ExamEntity): Observable<ExamEntity>;
}