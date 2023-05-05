import { Injectable } from '@angular/core';
import { MiahootService } from './miahoot.service';

@Injectable({
  providedIn: 'root'
})
export class PresentateurService {

  constructor(private miService:MiahootService) {
    
  }
}
