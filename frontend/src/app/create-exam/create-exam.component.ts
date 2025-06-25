import { Component, OnInit } from '@angular/core';
import { ExamUseCase } from '../../core/usecase/exam.usecase';

@Component({
  selector: 'app-create-exam',
  imports: [],
  templateUrl: './create-exam.component.html',
  styleUrl: './create-exam.component.scss'
})
export class CreateExamComponent implements OnInit {

 constructor(private examUseCase: ExamUseCase){}


  ngOnInit(): void {
    this.examUseCase.getListOfExams().subscribe(data => {
      console.log('data', data);
    })
  }



}
