import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {
  private apiUrl = 'http://localhost:8080'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getQuestionSetDetails(qSetId: number): Observable<QuestionSetDetails> {
    return this.http.get<QuestionSetDetails>(`${this.apiUrl}/questionList/${qSetId}`);
  }

  // Add other methods as needed
}

export interface QuestionSetDetails {
  qSetId: number;
  cls: string;
  subject: string;
  year: number;
  time: string;
}