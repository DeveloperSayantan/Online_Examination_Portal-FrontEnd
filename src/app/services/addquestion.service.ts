import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddquestionService {

  private apiUrl = 'http://localhost:8080'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  addQuestionSet(questionData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addQuestion`, questionData,{responseType:'text'});
  }

  fetchQuestionList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/questionList`);
  }

  deleteQuestionList(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteQuestion/${id}`, { responseType: 'text' });
  }
}
