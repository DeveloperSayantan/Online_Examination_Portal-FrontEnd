import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherloginService {

  private apiUrl = 'http://localhost:8080'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  teacherLogin(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post(`${this.apiUrl}/teacherLogin`, loginData);
  }
}