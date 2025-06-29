import {
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ExamUseCase } from '../../core/usecase/exam.usecase';
import { MatDialog } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { CreateExamComponent } from '../create-exam/create-exam.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ExamStatus, ExamStatusLabels, ExamTexts } from '../shared/constants';
import { ShortTimePipe } from '../shared/pipe/short-time.pipe';
@Component({
  selector: 'app-exam',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatListModule,
    MatProgressSpinnerModule,
    ShortTimePipe
  ],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss',
})
export class ExamComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  private examUseCase = inject(ExamUseCase);
  exams = computed(() => this.examUseCase.exams());
  readonly ExamStatus = ExamStatus;
  readonly ExamStatusLabels = ExamStatusLabels;
  readonly ExamTexts = ExamTexts;

  ngOnInit(): void {
    this.loadAllExams();
  }

  openNewExamModal(): void {
    const dialogRef = this.dialog.open(CreateExamComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  loadAllExams(): void {
    this.examUseCase.loadExams();
  }

  getStatusLabel(status: string): string {
    return this.ExamStatusLabels[status as ExamStatus] ?? 'Statut inconnu';
  }
}
