import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateExamComponent } from './create-exam/create-exam.component';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CreateExamComponent],
  providers: [{provide: 'BASE_API_URL', useValue: environment.apiUrl},],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
