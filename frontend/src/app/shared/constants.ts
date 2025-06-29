import { MatDateFormats } from '@angular/material/core';

export const DATE_DISPLAY_FORMAT = 'dd-MM-YYYY';
export const SNACKBAR = {
  ACTION_OK: 'OK',
  CLASS_SUCCESS: 'success-snackbar',
  CLASS_ERROR: 'error-snackbar',
};
export const MESSAGES = {
  EXAM_CREATION_SUCCESS: 'Examen ajouté avec succès',
  EXAM_CREATION_ERROR: "Erreur lors de la création de l'examen",
};

export const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
    timeInput: 'HH:mm',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    timeInput: 'HH:mm',
    timeOptionLabel: 'HH:mm',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export enum ExamStatus {
  CONFIRMED = 'confirmed',
  PENDING = 'pending',
  TO_ORGANIZE = 'to organize',
  CANCELLED = 'cancelled',
  SEARCHING = 'searching',
}

export const ExamStatusLabels: Record<ExamStatus | '', string> = {
  [ExamStatus.CONFIRMED]: 'Confirmé',
  [ExamStatus.PENDING]: 'En attente de confirmation',
  [ExamStatus.TO_ORGANIZE]: 'À organiser',
  [ExamStatus.CANCELLED]: 'Annulé',
  [ExamStatus.SEARCHING]: 'En recherche de place',
  ['']: 'En recherche de place',
};

export const ExamTexts = {
  TITLE: 'Mes examens',
  SUBTITLE: 'examens à venir',
  BUTTON_LABEL: 'Organiser un examen',
  FORM_TITLE: 'Organiser un examen',
  WAITING_TEXT: 'En attente',
  FORM: {
    NAME_LABEL: 'Nom',
    NAME_PLACEHOLDER: 'Nom du candidat',
    LOCATION_LABEL: 'Lieu',
    LOCATION_PLACEHOLDER: 'Lieu de passage',
    DATE_LABEL: 'Choisir une date',
    TIME_LABEL: 'Heure',
    STATUS_LABEL: 'Statut',
  },
};
