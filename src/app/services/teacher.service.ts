import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private readonly STORAGE_KEY = 'teacherDetails';
  // API URL for updating student details
  private apiUrl = 'http://localhost:8080/teachers';

  private teacherDetails: TeacherDetails | null = null;

  constructor(private http: HttpClient) {}


  getTeacherDetails(): TeacherDetails | null {
    if (!this.teacherDetails) {
      const storedDetails = sessionStorage.getItem(this.STORAGE_KEY);
      this.teacherDetails = storedDetails ? JSON.parse(storedDetails) : null;
    }
    return this.teacherDetails;
  }

  setTeacherDetails(details: TeacherDetails): void {
    this.teacherDetails = details;
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(details));
  }
  updateTeacherDetails(updatedDetails: any): Observable<any> {
    const url = `${this.apiUrl}/${updatedDetails.id}`;
    return this.http.put(url, updatedDetails);
  }
}

export interface TeacherDetails {
  id: number;
  name: string;
  email: string;
  phone: number;
  // Add other details as needed
}