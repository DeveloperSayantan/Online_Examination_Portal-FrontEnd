import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddboardService {

  private apiUrl = 'http://localhost:8080'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  addBoard(boardData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addBoard`, boardData,{responseType:'text'});
  }

  getBoards(): Observable<{ bid: number; boardName: string }[]> {
    return this.http.get<{ bid: number; boardName: string }[]>(`${this.apiUrl}/boards`);
  }

  deleteBoards(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteBoard/${id}`, { responseType: 'text' });
  }
  

}
