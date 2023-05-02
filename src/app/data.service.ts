import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { FirestoreDataConverter } from 'firebase/firestore';
import { Miahoot, Participant, Concepteur, Presentateur, Response, Question, Teacher } from './models/models';


export interface MiahootUser{
  readonly name:string;
  readonly mail:string;
  // readonly user_type : number;
  readonly miahootProjected:number
}

export type VOTES = { 
  [participantUID: string]: true 
}

export interface STATE{
  user:MiahootUser;
  miahoots:Miahoot;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor() { }
}

export const FsUserConverter : FirestoreDataConverter<STATE["user"]> = {
  toFirestore: U => U,
  fromFirestore: snap => ({
    mail: snap.get("mail"),
    name: snap.get("name"),
    user_type: snap.get("userType"),
    miahootProjected: snap.get("miahootProjected")
  })
}

export interface QCMProjected { 

      question: string; 
  
      responses: string[]; // Les réponses possibles 
  
      votes: VOTES[]; // Autant d'entrée dans le tableau que de réponses possibles 
  
  } 
  
  export interface MiahootProjected { 
  
      readonly id: string; 
  
      creator: string; 
  
      presentator: string; 
  
      currentQCM: string; 
  
      // QCMs: QCMProjected; 
  
  } 
  
  export const FsMiahootProjectedConverter: FirestoreDataConverter<MiahootProjected> = { 
  
      toFirestore: M => M, 
  
      fromFirestore: snap => ({ 
  
          id: snap.id, 
  
          creator: snap.get("creator"), 
  
          presentator: snap.get("presentator"), 
  
          currentQCM: snap.get("currentQCM"), 
  
      }) 
  
  }