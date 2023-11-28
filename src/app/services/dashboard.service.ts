import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8080'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getQuestionSets(): Observable<QuestionSet[]> {
    return this.http.get<QuestionSet[]>(`${this.apiUrl}/questionList`);
  }
}

export interface QuestionSet {
  qsetId: number;
  cls: string;
  subject: string;
  year: number;
  time: string;
}
