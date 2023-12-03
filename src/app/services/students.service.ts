import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private readonly STORAGE_KEY = 'studentDetails';
  // API URL for updating student details
  private apiUrl = 'http://localhost:8080/students';

  private studentDetails: StudentDetails | null = null;

  constructor(private http: HttpClient) {}


  getStudentDetails(): StudentDetails | null {
    if (!this.studentDetails) {
      const storedDetails = sessionStorage.getItem(this.STORAGE_KEY);
      this.studentDetails = storedDetails ? JSON.parse(storedDetails) : null;
    }
    return this.studentDetails;
  }

  setStudentDetails(details: StudentDetails): void {
    this.studentDetails = details;
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(details));
  }
  updateStudentDetails(updatedDetails: any): Observable<any> {
    const url = `${this.apiUrl}/${updatedDetails.id}`;
    return this.http.put(url, updatedDetails);
  }
}

export interface StudentDetails {
  id: number;
  name: string;
  cls: string;
  email: string;
  phone: number;
  // Add other details as needed
}