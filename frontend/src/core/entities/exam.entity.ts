import { ExamStatus } from "./exam-status.enum";

export interface ExamEntity {
    id: number;
    candidateName: string;
    location: string;
    date: string; 
    time: string;
    status: ExamStatus;
}