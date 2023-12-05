import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdmindashboardService {

  private apiUrl = 'http://localhost:8080'; // Replace with your actual backend API URL

  constructor(private http: HttpClient) { }

  getQuestionData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/questionList`);
  }

  getSchoolData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/schools`);
  }

  getBoardData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/boards`);
  }

  getStudentData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/students`);
  }
}
