import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, switchMap } from 'rxjs';
import { authState } from '@angular/fire/auth';
import { docData } from '@angular/fire/firestore';
import { Auth } from 'firebase/auth';
import { Firestore, FirestoreDataConverter, doc } from 'firebase/firestore';


//a deplacer plus tard
export interface QuestionReponses {
  question: string;
  reponses: string[];
  estCorrecte: boolean[];
}

export interface Miahoot {
  id: number;
  questrep: QuestionReponses[];
}
// Exemple d'objet pour tester la structure Miahoot
const miahoots: Miahoot[] = [
  {
    id: 1,
    questrep: [{
      question: "Quel est le plus grand pays du monde en termes de surface ?",
      reponses: ["Russie", "Chine", "États-Unis", "Canada"],
      estCorrecte: [true, false, false, false]
    }]
  },
  {
    id: 2,
    questrep: [{
      question: "Quel est le plus grand pays du monde en termes de superficie en eau ?",
      reponses: ["Australie", "Qatar", "Arabie saoudite", "Tunisie"],
      estCorrecte: [true, false, false, false]
    },{
      question: "Quel est le plus grand pays du monde en termes de surface ?",
      reponses: ["Russie", "Chine", "États-Unis", "Canada"],
      estCorrecte: [true, false, false, false]
    }]
  },
  {
    id: 3,
    questrep: [{
      question: "Quel est le plus haut sommet du monde ?",
      reponses: ["Mont Everest", "Kilimandjaro", "Mont Blanc", "Aconcagua"],
      estCorrecte: [true, false, false, false]
    }]
  }, { id: -1, questrep: [{ question: '', reponses: [], estCorrecte: [] }] }
];
// fin des éléments à supprimer ou déplacer





export type VOTES = {
  [participantUID: string]: true
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

@Injectable({
  providedIn: 'root'
})
export class MiahootService {

  private apiUrl = '/api/miahoot';
  readonly obsProjectedMiahootID: Observable<string | undefined>;
  readonly obsProjectedMiahoot: Observable<undefined | MiahootProjected>

  constructor(private http: HttpClient, private fs: Firestore) {//rajouter private auth : Auth dans le construceur
 /*
   this.obsProjectedMiahootID = authState(auth).pipe(

      switchMap(U => {

        if (U == null) {
          return of(undefined);
        }
        else {
          // Il faut renvoyer un observable du projected Miahoot de l'utilisateur U dans la collection users de Firestore 
          const docUser = doc(fs, `users/${U.uid}`).withConverter(FsUserConverter);
          return docData(docUser).pipe(map(miahootUser => miahootUser.projectedMiahoot))
        }
      }
      )

    );
*/
    this.obsProjectedMiahoot = this.obsProjectedMiahootID.pipe(

      switchMap(projectedMiahootID => {

        if (projectedMiahootID === undefined) {

          return of(undefined);

        } else {

          // Il faut aller observer un projected Miahoot dans FifreStore, à l'adresse miahoot/projectedMiahootID 
          const docProjectedMiahoot = doc(fs, `miahoot/${projectedMiahootID}`).withConverter(FsMiahootProjectedConverter);

          return docData(docProjectedMiahoot);

        }
      }
      ))
  }

  getMiahoot(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createMiahoot(miahoot: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, miahoot);
  }

  deleteMiahoot(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  /*
    updateMiahoot(id: number, miahoot: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/${id}`, miahoot);
    }*/


}
