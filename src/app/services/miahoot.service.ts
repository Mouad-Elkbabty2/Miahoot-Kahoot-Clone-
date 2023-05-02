import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Miahoot, Question, Teacher } from '../models/models';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiahootService {

  private urlMi = '/api/miahoot';
  private urlQuestion = '/api/question';
  private urlTeacher = '/api/teacher';

  constructor(private http: HttpClient) { }

  //------------------ API Miahoot --------------------

  async getMiahoot(id: number): Promise<Miahoot> {
    return firstValueFrom(this.http.get<Miahoot>(`${this.urlMi}/${id}`));
  }

  async createMiahoot(miahoot: Miahoot): Promise<Miahoot> {
    return firstValueFrom(this.http.post<Miahoot>(`${this.urlMi}/`, miahoot));
  }

  async deleteMiahoot(id: number): Promise<any> {
    return firstValueFrom(this.http.delete(`${this.urlMi}/${id}`));
  }

  async updateMiahoot(id: number, miahoot: Partial<Miahoot>): Promise<Miahoot> {
    return firstValueFrom(this.http.put<Miahoot>(`${this.urlMi}/${id}`, miahoot));
  }
  

  //----------------- API Question --------------------

  async getQuestion(id: number): Promise<Question> {
    return firstValueFrom(this.http.get<Question>(`${this.urlQuestion}/${id}`));
  }

  async createQuestion(miahootId: number, question: Question): Promise<Question> {
    return firstValueFrom(this.http.post<Question>(`${this.urlQuestion}/miahoot/${miahootId}`, question));
  }

  async deleteQuestion(id: number): Promise<any> {
    return firstValueFrom(this.http.delete(`${this.urlQuestion}/${id}`));
  }

  async updateQuestion(id: number, label: string): Promise<any> {
    return firstValueFrom(this.http.put(`${this.urlQuestion}/${id}`, label));
  }

  //----------------- API Teacher -----------------------

  async getTeacher(id: number): Promise<Teacher> {
    return firstValueFrom(this.http.get<Teacher>(`${this.urlTeacher}/${id}`));
  }

  async createTeacher(teacher: Teacher): Promise<any> {
    return firstValueFrom(this.http.post<Teacher>(`${this.urlTeacher}/`, teacher));
  }

  async deleteTeacher(id: number): Promise<any> {
    return firstValueFrom(this.http.delete(`${this.urlTeacher}/${id}`));
  }
}
