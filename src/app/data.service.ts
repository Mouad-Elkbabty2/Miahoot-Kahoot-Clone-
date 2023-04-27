import { Injectable } from '@angular/core';

interface MiahootUser{
  readonly name:string;
  readonly mail:string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
}
