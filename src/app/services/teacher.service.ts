import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {


  private readonly STORAGE_KEY = 'teacherDetails';
  private apiUrl = 'http://localhost:8080';

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
    const url = `${this.apiUrl}/teachers/${updatedDetails.tid}`;
    return this.http.put(url, updatedDetails);
  }

  getAllTeachers():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/teachers`);
  }
  
  getStudentData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/students`);
  }
  // Method to fetch school details by school ID
  fetchSchoolDetails(schoolId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/schools/${schoolId}`);
  }

  getSchools(): Observable<{ sid: number; schoolName: string }[]> {
    return this.http.get<{ sid: number; schoolName: string }[]>(`${this.apiUrl}/schools`);
  }

  
}

export interface TeacherDetails {
  tid: number;
  name: string;
  email: string;
  phone: number;
  subject: string,
  school_id: SchoolEntity;
  board_id: BoardEntity;
  password : string;
  // Add other details as needed
}
export interface SchoolEntity {
  sid: number;
  // Add other properties of SchoolEntity as needed
}

export interface BoardEntity {
  bid: number;
  // Add other properties of BoardEntity as needed
}