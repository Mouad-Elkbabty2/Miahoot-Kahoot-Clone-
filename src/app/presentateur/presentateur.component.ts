import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Miahoot,
  MiahootProjected,
  QCMProjected,
  Question,
  VOTES,
} from '../models/models';
import {
  FirestoreDataConverter,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { FsMiahootProjectedConverter } from '../data.service';
import { AuthService } from '../services/auth.service';
import { PresentateurService } from '../services/presentateur.service';
import { NgxQRCodeModule } from 'ngx-qrcode2';

interface QuestionVote {
  votes: VOTES[];
}

export const QuestionVoteConverter: FirestoreDataConverter<QuestionVote> = {
  fromFirestore: snap => ({ votes: snap.get('votes') }),
  toFirestore: vc => vc
}


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
  remainingTime?: number;
  timerInterval: any;
  questionTimer = 0;
  participantNames: string[];
  votes: number[];
  totalVotes: number;
  showParticipants: boolean = false;
  showVotes: boolean = false;
  voteResults : {[participantId: string]: number} = {};
  participantVotes: {name: string, count: number, options: string[]}[] = [];
  lastVotes : {[participantId: string]: any} = {};
  voteDesparticipants : number[];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fs: Firestore,
    private auth: AuthService
  ) { }

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

  async inverse() {
    this.showQuestion = !this.showQuestion;
    const docRef = doc(this.fs, `miahootProjected/${this.miahootId}`);
    await setDoc(docRef, { showQuestion: this.showQuestion }, { merge: true });
    if (this.showQuestion) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }

  async nextQuestion(id: string, i: number) {
    const docProjectedMiahoot = doc(
      this.fs,
      `miahootProjected/${id}`
    ).withConverter(FsMiahootProjectedConverter);

    const snapMiahoot = await getDoc(docProjectedMiahoot);
    this.miahootProjected = snapMiahoot.data() as MiahootProjected;

    this.miahootProjected.indexQuestion += i;
    this.miahootProjected.creator =
      this.miahootProjected.creator || 'default_creator';
    this.miahootProjected.presentator =
      this.miahootProjected.presentator || 'default_creator';

    await setDoc(
      doc(this.fs, `miahootProjected/${id}`),
      this.miahootProjected,
      {
        merge: true,
      }
    );
    this.afficherRep();
    await this.inverse(); // Inverser l'affichage de la question et démarrer le timer
    this.startTimer();
  }

  async questionSwitcher(i: number) {
    this.stopTimer();
    await this.nextQuestion(this.miahootId ?? '', i);
    await this.inverse();
    this.startTimer();
  }

  async startTimer() {
    this.showTimer = true;

    const docRef = doc(this.fs, `miahootProjected/${this.miahootId}`);

    if (this.questionTimer !== undefined) {
      await setDoc(
        docRef,
        { questionTimer: this.questionTimer },
        { merge: true }
      );
    }

    this.remainingTime = this.questionTimer; // Initialisation du temps restant avec la valeur du timer

    const startTime = Date.now();
    this.timerInterval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
      this.remainingTime = Math.max(this.questionTimer - elapsedSeconds, 0);

      if (this.remainingTime <= 0) {
        this.stopTimer();
        this.showAnswers = true;
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


  async getNamesFromVotesCollection(indexQuestion: number) {
    const questionRef = doc(this.fs, `miahootProjected/${this.miahootId}/currentQCM/question${indexQuestion}`);
    const questionDoc = await getDoc(questionRef);
    const votes = questionDoc.data()?.['votes'];
    const participantIds: string[] = [];
    if (votes) {
      for (const vote of votes) {
        const participantId = Object.keys(vote)[0];
        if (!participantIds.includes(participantId)) {
          participantIds.push(participantId);
        }
      }
    }

    this.showParticipants = !this.showParticipants;

    this.participantNames = participantIds;

    this.getVotesParticipant(indexQuestion);

  }

  async getVotes(indexQuestion: number) {
    const questionRef = doc(this.fs, `miahootProjected/${this.miahootId}/currentQCM/question${indexQuestion}`).withConverter(QuestionVoteConverter);
    const questionDoc = await getDoc(questionRef);
    const votes = questionDoc.data()?.votes ?? [];


    const votesUniques = votes.reduce((V, v) => ({ ...V, ...v }), {} as VOTES)
    const stats = Object.keys(votesUniques).reduce(
      (S, v) => {
        const choix = votesUniques[v]
        S[choix] = 1 + (S[choix] ?? 0);
        return S;
      },
      [] as number[] // nombre de fois qu'on a voté vote
    )

    this.votes = stats;
    this.showVotes = !this.showVotes;

    this.totalVotes = this.votes.reduce((acc, curr) => acc + curr, 0);

  }
  async getVotesParticipant(indexQuestion: number) {
    const questionRef = doc(this.fs, `miahootProjected/${this.miahootId}/currentQCM/question${indexQuestion}`).withConverter(QuestionVoteConverter);
    const questionDoc = await getDoc(questionRef);
    const votes = questionDoc.data()?.votes ?? [];


    const votesUniques = votes.reduce((V, v) => ({ ...V, ...v }), {} as VOTES)
    const stats = Object.keys(votesUniques).reduce(
      (S, v) => {
        const choix = votesUniques[v]
        S[choix] = 1 + (S[choix] ?? 0);
        return S;
      },
      [] as number[] // nombre de fois qu'on a voté vote
    )
      this.voteDesparticipants = stats;
      
  }

  async getVoteCounts(indexQuestion: number) {
    const questionRef = doc(this.fs, `miahootProjected/${this.miahootId}/currentQCM/question${indexQuestion}`);
    const questionDoc = await getDoc(questionRef);
    const votes = questionDoc.data()?.['votes'];
    const voteCounts: {[participantId: string]: number} = {};
  
    if (votes) {
      for (const vote of votes) {
        const participantId = Object.keys(vote)[0];
        if (!voteCounts[participantId]) {
          voteCounts[participantId] = 0;
        }
        voteCounts[participantId]++;
      }
    }
    this.voteResults =voteCounts ;
    return voteCounts;
  }
      

}
