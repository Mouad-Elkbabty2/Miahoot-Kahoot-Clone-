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
  remainingTime: number = 0;
  timerInterval : any;
  reponseIndex:number;
  uid = localStorage.getItem('uid');
  nomUser = localStorage.getItem('nom');



  constructor(
    private route: ActivatedRoute,
    private fs: Firestore,
    private db: AngularFireDatabase,
    private auth : Auth,
  ) {

  }

  async ngOnInit(): Promise<void> {  
    console.log();
     
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
    this.miahoot$?.subscribe(data => this.remainingTime = data?.questionTimer ?? 0) // Initialisation de la propriété
    console.log(this.remainingTime);
    
    /* const interval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--; // Décrémentation de la propriété
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return this.remainingTime; */
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

  async addVote(indexReponse: number, participantId: string) {
    // Accéder au doc et au current qcm sur Firebase
    this.miahoot$?.subscribe(data => this.indexQuestion = data?.indexQuestion ?? 0)
    const miahootProjectedVotesCollectionRef = doc(
      this.fs,
      `miahootProjected/${this.idMiahoot}/currentQCM/${this.indexQuestion}`
    );
  
    // Créer un objet vote pour l'utilisateur actuel
    let newVote: VOTES = { [participantId]: indexReponse };
    
    // Ajouter le nouvel objet vote à la liste des votes actuels
    try {
      const currentQcmDoc = await getDoc(miahootProjectedVotesCollectionRef);
      const currentVotes = currentQcmDoc.data()?.['votes'] ?? [];
      currentVotes.push(newVote);
      await setDoc(miahootProjectedVotesCollectionRef, { votes: currentVotes }, { merge: true }).then(()=> console.log("vote ajouté avec succées"))
    } catch (e) {
      console.error("Erreur lors de l'ajout du vote :", e);
    }
  }

  onResponseClick(responseIndex: number) {
    this.reponseIndex = responseIndex;
    
  }
}
