import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiahootService {

  private apiUrl = '/miahoot';

  constructor(private http: HttpClient) { }

  getMiahoot(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

/*   createMiahoot(miahoot: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, miahoot);
  }

  updateMiahoot(id: number, miahoot: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, miahoot);
  }

  deleteMiahoot(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  } */
}
