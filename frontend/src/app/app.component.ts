import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExamComponent } from './exam/exam.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ExamComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
