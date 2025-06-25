import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ExamRepository } from '../core/repository/exam.repository';
import { HttpApiExamRepository } from '../infrastructure/http-api-exam.repository';
import { HttpClientModule } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    { provide: ExamRepository, useClass: HttpApiExamRepository },
    importProvidersFrom(HttpClientModule)
  ]
};
