import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddschoolService {

  private apiUrl = 'http://localhost:8080'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  addSchool(schoolData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addSchool`, schoolData,{responseType:'text'});
  }

  getSchools(): Observable<{ sid: number; schoolName: string; location: string }[]> {
    return this.http.get<{ sid: number; schoolName: string; location: string }[]>(`${this.apiUrl}/schools`);
  }

  deleteSchool(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteSchool/${id}`, { responseType: 'text' });
  }
}