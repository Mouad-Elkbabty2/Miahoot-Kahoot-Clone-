import { Injectable } from '@angular/core';
import { MiahootService } from './miahoot.service';
import { Observable, map, of, switchMap } from 'rxjs';
import { authState,Auth } from '@angular/fire/auth';
import { docData } from '@angular/fire/firestore';
import { Firestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { MiahootUser, FsUserConverter, FsMiahootProjectedConverter } from '../data.service';
import { MiahootProjected } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class PresentateurService {
  
  obsMiUser: Observable<MiahootUser | undefined>;
  readonly obsProjectedMiahootID: Observable<string | undefined>;
  readonly obsProjectedMiahoot: Observable<undefined | MiahootProjected>;
  public docId:string;
  miahootProjected:MiahootProjected;

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

  
  async getMiahootById(id: string) {
    const miahootDocRef = doc(this.fs, `miahootProjected/${id}`).withConverter(FsMiahootProjectedConverter);
    const snapMiahoot = await getDoc(miahootDocRef);
    this.miahootProjected = snapMiahoot.data() as MiahootProjected;
  }

  async nextQuestion(id: string) {
    const docProjectedMiahoot = doc(this.fs, `miahoot/${id}`).withConverter(FsMiahootProjectedConverter);
    const snapMiahoot = await getDoc(docProjectedMiahoot);
    this.miahootProjected = snapMiahoot.data() as MiahootProjected;
    this.miahootProjected.indexQuestion++;

    await setDoc(doc(this.fs, `miahootProjected/${id}`), this.miahootProjected, { merge: true });
  
    // Mettre à jour la valeur de l'attribut indexQuestion localement
    this.miahootProjected.indexQuestion += 1;
  }
  
  
  
}
