import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionpaperService {
  private apiUrl = 'http://localhost:8080'; // replace with your Spring Boot API URL

  constructor(private http: HttpClient) {}

  getQuestionData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/questionList`);
  }

  getQuestionsByQSetId(qSetId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/questionsets/${qSetId}`);
  }
  saveQuizResults(results: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/results`, results).pipe(
      catchError((error: any) => {
        console.error('Error in saveQuizResults:', error);
        throw error;
      })
    );
  }
  

}
