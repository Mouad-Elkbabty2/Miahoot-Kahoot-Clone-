import { Injectable } from '@angular/core';
import { FirestoreDataConverter, doc, getDoc, setDoc } from 'firebase/firestore';
import { Miahoot, Participant, Concepteur, Presentateur, Response, Question, Teacher } from './models/models';
import { Firestore } from '@angular/fire/firestore';
import { Auth, authState, signInAnonymously, signOut, User, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Observable, tap } from 'rxjs';



export interface MiahootUser{
  readonly name:string;
  readonly mail?:string;
  readonly user_type? : number;
  readonly miahootProjected?:number
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

  obsMiUser : Observable<MiahootUser | undefined>;

  constructor(private auth: Auth, private fs : Firestore) {
    if (auth) {
      authState(this.auth).pipe(
        tap(async (U: User | null) => {
          if (!!U) {
            const user = U; // await this.auth.currentUser;
            if (user) {
              const userDocRef = doc(this.fs, `users/${user.uid}`).withConverter(FsUserConverter);
              const snapUser = await getDoc(userDocRef);
              if (!snapUser.exists()) {
                setDoc(userDocRef, {
                  name: user.displayName ?? user.email ?? user.uid,
                  mail: user.email ?? "",
                  miahootProjected: 0,
                } as MiahootUser);
              }
            }
          }
        })
      ).subscribe((U: User | null) => {
        const isLoggedIn = !!U;
      });
    }
    
  }
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