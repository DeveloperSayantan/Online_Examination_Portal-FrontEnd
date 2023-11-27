import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiUrl = 'http://localhost:8080'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  signUp(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/students`, userData,{responseType:'text'});
  }

  getSchools(): Observable<{ sid: number; schoolName: string }[]> {
    return this.http.get<{ sid: number; schoolName: string }[]>(`${this.apiUrl}/schools`);
  }

  getBoards(): Observable<{ bid: number; boardName: string }[]> {
    return this.http.get<{ bid: number; boardName: string }[]>(`${this.apiUrl}/boards`);
  }
  saveSchool(schoolData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/schools`, schoolData);
  }
}
