import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private apiUrl = 'http://localhost:8080/results';

  constructor(private http: HttpClient) {}

  getResultsByStudentId(studentId: number): Observable<any> {
    const url = `${this.apiUrl}/${studentId}`;
    return this.http.get(url);
  }
}
