
import { Observable } from "rxjs";
import { ExamRepository } from "../repository/exam.repository";
import { ExamEntity } from "../entities/exam.entity";
import { Inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class ExamUseCase {
   constructor(private examRepositoryInterface: ExamRepository){}

getListOfExams(): Observable<ExamEntity[]> {
    return this.examRepositoryInterface.listOfExams();
}

createNewExam(newExam: ExamEntity): Observable<ExamEntity>{
    return this.examRepositoryInterface.createExam(newExam);
}
}