import { Injectable } from '@angular/core';
import { FirestoreDataConverter, addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { Miahoot, MiahootProjected, QCMProjected } from './models/models';
import { Firestore, docData } from '@angular/fire/firestore';
import { Auth, authState } from '@angular/fire/auth';
import { Observable, map, of, switchMap } from 'rxjs';
import { MiahootService } from './services/miahoot.service';

export const FsUserConverter: FirestoreDataConverter<STATE["user"]> = {
  toFirestore: U => U,
  fromFirestore: snap => ({
    mail: snap.get("mail"),
    name: snap.get("name"),
    image: snap.get("image"),
    miahootProjected: snap.get("miahootProjected"),
    teacherId: snap.get("teacherId"),
  })
}

export const FsMiahootProjectedConverter: FirestoreDataConverter<MiahootProjected> = {
  toFirestore: M => M,
  fromFirestore: snap => ({
    id: snap.id,
    label: snap.get("label"),
    pin : snap.get("pin"),
    creator: snap.get("creator"),
    presentator: snap.get("presentator"),
    currentQCM: snap.get("currentQCM"),
  })
}

export interface MiahootUser {
  readonly name: string;
  readonly mail?: string;
  readonly miahootProjected?: number;
  teacherId?: number;
  image?: string;
}

export type VOTES = {
  [participantUID: string]: true
}

export interface STATE {
  user: MiahootUser;
  miahoots: Miahoot;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  obsMiUser: Observable<MiahootUser | undefined>;
  readonly obsProjectedMiahootID: Observable<number | undefined>;
  readonly obsProjectedMiahoot: Observable<undefined | MiahootProjected>;
  public docId:string;

  constructor(private auth: Auth, private fs: Firestore, private miService: MiahootService) {
    this.obsProjectedMiahootID = authState(auth).pipe(switchMap(U => {
      if (U == null) {
        return of(undefined);
      } else {
        const docUser = doc(fs, `users/${U.uid}`).withConverter(FsUserConverter);
        return docData(docUser).pipe(map(miahootUser => miahootUser.miahootProjected));
      }
    }));
    this.obsProjectedMiahoot = this.obsProjectedMiahootID.pipe(switchMap(projectedMiahootID => {
      if (projectedMiahootID === undefined) {
        return of(undefined);
      } else {
        const docProjectedMiahoot = doc(fs, `miahoot/${projectedMiahootID}`).withConverter(FsMiahootProjectedConverter);
        return docData(docProjectedMiahoot);
      }
    }));
  }

  async addMiahootToFs(id: number) {
    // Récupérer le Miahoot depuis l'API
    const miahoot: Miahoot = await this.miService.getMiahoot(id);

    // Créer un nouvel objet MiahootProjected
    const miahootProjected: MiahootProjected = {
      id: '',
      label: '',
      pin: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
      currentQCM: [{
        question: '',
        responses: [],
        votes: []
      }]
    };

    // Ajouter le MiahootProjected à Firestore
    const docRef = await addDoc(collection(this.fs, 'miahootProjected'), miahootProjected);
    miahootProjected.id = docRef.id;
    miahootProjected.label = miahoot.nom;

    // Modifier le nouvel objet MiahootProjected en conséquence
    const qcms: QCMProjected[] = [];
    const len = miahoot.questions?.length ?? 0;

    for (let i = 0; i < len; i++) {
      const question = miahoot.questions?.[i];
      const responses = question?.responses ?? [];
      const votes = responses.map((_, index) => index === i);

      const qcm: QCMProjected = {
        question: question?.label ?? '',
        responses,
        votes: votes.reduce((acc, val, index) => ({ ...acc, [index]: val }), {})
      };

      qcms.push(qcm);
      miahootProjected.currentQCM = qcms;
    }

    // Mettre à jour le document dans Firestore
    await setDoc(doc(this.fs, `miahootProjected/${miahootProjected.id}`), miahootProjected, { merge: true });

    return docRef;
  }

}

