import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ExamUseCase } from '../../core/usecase/exam.usecase';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import {
  MAT_DATE_FORMATS,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { ExamEntity } from '../../core/entities/exam.entity';
import { MatDialogRef } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { ExamTexts, DATE_DISPLAY_FORMAT, ExamStatus, ExamStatusLabels, MESSAGES, MY_DATE_FORMATS, SNACKBAR } from '../shared/constants';


@Component({
  selector: 'app-create-exam',
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    DatePipe,
  ],
  imports: [
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTimepickerModule
  ],
  templateUrl: './create-exam.component.html',
  styleUrl: './create-exam.component.scss',
})
export class CreateExamComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private datepipe = inject(DatePipe);
  private examUseCase = inject(ExamUseCase);
  private dialogRef = inject(MatDialogRef<CreateExamComponent>);
  examStatuses = Object.values(ExamStatus);
  private _snackBar = inject(MatSnackBar);
  readonly ExamStatusLabels = ExamStatusLabels;
  readonly ExamStatus = ExamStatus;
  readonly CreateExamTexts = ExamTexts;

  
  ngOnInit(): void {}

  examForm = this.formBuilder.group({
    name: ['', Validators.required],
    location: ['', Validators.required],
    date: [new Date(), Validators.required],
    time: ['', Validators.required],
    status: ['', Validators.required],
  });

  onSubmit() {
    if (this.examForm.valid) {
      this.createAnExam();
    }
  }

  createAnExam(): void {
    if (this.examForm.invalid) {
      this.examForm.markAllAsTouched();
      return;
    }

    const { name, location, date, time, status } = this.examForm.value;

    const formattedDate = this.datepipe.transform(date, DATE_DISPLAY_FORMAT )!;

    const newExam: ExamEntity = {
      candidateName: name!,
      location: location!,
      date: formattedDate,
      time: time!,
      status: status!,
    };

    this.examUseCase.createNewExam(newExam).subscribe({
      next: (data) => {
        this.openSnackBar(MESSAGES.EXAM_CREATION_SUCCESS, SNACKBAR.ACTION_OK, SNACKBAR.CLASS_SUCCESS);
        this.examForm.reset();
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.openSnackBar(MESSAGES.EXAM_CREATION_SUCCESS, SNACKBAR.ACTION_OK, SNACKBAR.CLASS_SUCCESS);
      },
    });
  }
  openSnackBar(message: string, action: string, className: string): void {
    this._snackBar.open(message, action,{
      panelClass: className,
    });
  }

}
