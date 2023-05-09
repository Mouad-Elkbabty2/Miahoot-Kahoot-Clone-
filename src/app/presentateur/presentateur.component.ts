import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Miahoot,
  MiahootProjected,
  QCMProjected,
  Question,
} from '../models/models';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { FsMiahootProjectedConverter } from '../data.service';
import { AuthService } from '../services/auth.service';
import { PresentateurService } from '../services/presentateur.service';

@Component({
  selector: 'app-presentateur',
  templateUrl: './presentateur.component.html',
  styleUrls: ['./presentateur.component.scss'],
})
export class PresentateurComponent {
  i = 0;
  miahoot: unknown;
  miahootProjected: MiahootProjected;
  indexQuestion: number = 0;
  qcmCourant: QCMProjected;
  showAnswers = false;
  disable = true;
  miahootId = this.route.snapshot.paramMap.get('id');
  showQuestion = false;
  showTimer = false;
  remainingTime = 10;
  timerInterval: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fs: Firestore,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.getMiahootById(this.miahootId ?? '');

  }


  async getMiahootById(id: string) {
    const miahootDocRef = doc(this.fs, `miahootProjected/${id}`).withConverter(
      FsMiahootProjectedConverter
    );
    const snapMiahoot = await getDoc(miahootDocRef);
    this.miahootProjected = snapMiahoot.data() as MiahootProjected;
  }

  inverse() {
    this.showQuestion = !this.showQuestion;

    if (this.showQuestion) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }

  async nextQuestion(id: string,i : number) {
    const docProjectedMiahoot = doc(this.fs, `miahootProjected/${id}`).withConverter(FsMiahootProjectedConverter);

    const snapMiahoot = await getDoc(docProjectedMiahoot);
    this.miahootProjected = snapMiahoot.data() as MiahootProjected;
    
    this.miahootProjected.indexQuestion += i ;
    this.miahootProjected.creator = this.miahootProjected.creator || 'default_creator';
    this.miahootProjected.presentator = this.miahootProjected.presentator || 'default_creator';

    setDoc(doc(this.fs, `miahootProjected/${id}`),  this.miahootProjected, { merge: true }); 
  }

  async questionSwitcher(i: number) {
    this.stopTimer();
    await this.nextQuestion(this.miahootId ?? '',i);
    this.startTimer();
  }

  startTimer() {
    this.showTimer = true;
    this.remainingTime = 10;

    this.timerInterval = setInterval(() => {
      this.remainingTime--;

      if (this.remainingTime <= 0) {
        this.stopTimer();
        this.showAnswers = true; // Afficher automatiquement les réponses lorsque le temps est écoulé
      }
    }, 1000);
  }

  stopTimer() {
    this.showTimer = false;
    clearInterval(this.timerInterval);
  }
  formatTime(time: number): string {
    const minutes: string = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds: string = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }
  afficherRep() {
    this.showAnswers = !this.showAnswers;
  }

  setVotes(votes: any) {
    // TODO: Afficher les votes dans l'interface
  }

  retToMyMiahoot() {
    this.router.navigate(['/my-miahoots/' + this.auth.getUid()]);
  }
}