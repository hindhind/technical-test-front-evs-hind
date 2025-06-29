import { map, Observable } from "rxjs";
import { ExamEntity } from "../core/entities/exam.entity";
import { ExamRepository } from "../core/repository/exam.repository";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment.development";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
export class HttpApiExamRepository implements ExamRepository {
    private baseUrl = `${environment.apiUrl}`;
    constructor(private http: HttpClient) {}

    listOfExams(): Observable<ExamEntity[]> {
        return this.http.get(`${this.baseUrl}/exams`).pipe(map((response: any) => response ?? []));
     }

    createExam(exam: ExamEntity): Observable<ExamEntity> {
        return this.http.post<ExamEntity>(`${this.baseUrl}/exams`, exam);
    }
   
   
 
}