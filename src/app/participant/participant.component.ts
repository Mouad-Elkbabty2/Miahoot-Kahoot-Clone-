import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import {DocumentData,DocumentSnapshot,collection,doc,getDocs, onSnapshot,query,where, getDoc, setDoc,} from 'firebase/firestore';
import { MiahootProjected, QCMProjected, Response, VOTES } from '../models/models';
import {Observable,Subscription,map} from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss'],
})
export class ParticipantComponent implements OnInit {
  pin = this.route.snapshot.paramMap.get('pin') ?? '';
  miahootProjected: any;
  miahoot$: Observable<MiahootProjected | null> | undefined;
  miahoot: MiahootProjected | undefined | null;
  indexQuestion = 0;
  private subscription: Subscription | undefined;
  idMiahoot: string;
  showQuestion?: boolean;
  questionTimer : number = 0;


  constructor(
    private route: ActivatedRoute,
    private fs: Firestore,
    private db: AngularFireDatabase,
    private auth : Auth
  ) {

  }

  async ngOnInit(): Promise<void> {
    this.pin = this.route.snapshot.paramMap.get('pin') ?? '';
    const miahoot = await this.getMiahootByCodePin(this.pin);
    const miahootProjectedCollectionRef = collection(
      this.fs,
      'miahootProjected'
    );
    const docRef = doc(miahootProjectedCollectionRef, miahoot.id);

    this.miahoot$ = new Observable<DocumentSnapshot>((observer) => {
      const unsubscribe = onSnapshot(
        docRef,
        (docSnapshot) => {
          observer.next(docSnapshot);
        },
        (error) => {
          observer.error(error);
        }
      );
      return unsubscribe;
    }).pipe(
      map((docSnapshot) => {
        if (docSnapshot.exists()) {
          return {
            id: docSnapshot.id,
            ...docSnapshot.data(),
          } as MiahootProjected;
        } else {
          return null;
        }
      })
    );
  }

  startTimer() {
    let timer = setInterval(() => {
      if (this.miahoot && this.miahoot.questionTimer !== undefined && this.miahoot.questionTimer > 0) {
        this.miahoot.questionTimer--;
      } else {
        clearInterval(timer);
        // Le temps est écoulé, faire quelque chose ici
      }
    }, 1000);
  }
  
  

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  async getMiahootByCodePin(codePin: string): Promise<MiahootProjected> {
    const miahootProjectedCollectionRef = collection(
      this.fs,
      'miahootProjected'
    );
    const req = query(
      miahootProjectedCollectionRef,
      where('pin', '==', parseInt(codePin, 10))
    );
    const snap = await getDocs(req);

    if (snap.empty) {
      throw new Error(`No miahoot projected found with pin ${codePin}`);
    }

    const doc = snap.docs[0];
    const data = doc.data() as DocumentData;
    this.idMiahoot = data['id'];

    return {
      id: doc.id,
      label: data['label'],
      currentQCM: data['currentQCM'],
      indexQuestion: data['indexQuestion'],
      pin: data['pin'],
      presentator: data['presentator'],
      showQuestion: data['showQuestion'],
      questionTimer : data['questionTimer']
    };
  }
  async submitResponse(indexQuestion: number) {
    // Accéder au doc et au current qcm sur Firebase
    const miahootProjectedVotesCollectionRef = collection(
      this.fs,
      `miahootProjected/${this.idMiahoot}/currentQCM`
    );
  
    // Créer un objet vote pour l'utilisateur actuel
    let newVote: VOTES = {};
    if (this.auth.currentUser) {
      newVote[this.auth.currentUser.uid] = true;
    }
  
    // Ajouter le nouvel objet vote à la liste des votes actuels
    try {
      const currentQcmDocRef = doc(miahootProjectedVotesCollectionRef, `${indexQuestion}`);
      const currentQcmDoc = await getDoc(currentQcmDocRef);
      const currentVotes = currentQcmDoc.data()?.['votes'] ?? [];
      currentVotes.push(newVote);
      await setDoc(currentQcmDocRef, { votes: currentVotes }, { merge: true });
      console.log("Vote ajouté avec succès !");
    } catch (e) {
      console.error("Erreur lors de l'ajout du vote :", e);
    }
  }
<<<<<<< HEAD
  
=======


>>>>>>> afd32c2abd9c30c4288a859eb97599742c7fd687
  
}