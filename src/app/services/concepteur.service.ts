import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authState } from '@angular/fire/auth';
import { firstValueFrom, Observable, switchMap } from 'rxjs';
import { Miahoot } from '../models/models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConcepteurService {
  readonly obsMiahoots : Observable<Miahoot[]>
  constructor(private auth : AuthService, private httpClient : HttpClient) { 
    this.obsMiahoots = auth.user.pipe(
      switchMap(async U => {
        if(!U){return []}

        const L = await firstValueFrom(httpClient.get<Miahoot[]>(`/teacher/${U.uid}/miahoots`))//get miahoots utilisateur
        return L;
      })
    )
  }
}
