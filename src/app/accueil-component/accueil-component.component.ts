
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { MiahootProjected, QCMProjected, Response } from '../models/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil-component.component.html',
  styleUrls: ['./accueil-component.component.scss']
})

export class AccueilComponent implements OnInit {
  miahootId: string;
  miahootProjected : any;
  currentQuestionIndex: number = 0;
  selectedResponses: number[] = [];
  codePin: string = '';
  isCodePinEntered: boolean = false;
  indexQuestion = 0;

  pin: number;
  nom: string;
  pinSaisi = false;
  pinValide = false;
  nomSaisi = false;
  participantNom = "";


  obsCurrentQCM : Observable<QCMProjected>;
  private currentQCMSubject = new BehaviorSubject<QCMProjected[]>([]);

  constructor(private route: ActivatedRoute, private fs: Firestore, private router : Router, public authService: AuthService) {}

  public getCurrentQCM(): Observable<QCMProjected[]> {
    console.log(this.miahootProjected.currentQCM);
    
   // this.currentQCMSubject.next(this.miahootProjected.currentQCM);
    //console.log(this.currentQCMSubject.asObservable());
    return this.currentQCMSubject.asObservable();
  }

  ngOnInit(): void {
    this.miahootId = this.route.snapshot.paramMap.get('id') ?? '';
    this.getMiahootById(this.miahootId);
    this.subscribeToPresenterInstructions();
    this.miahootProjected = this.getMiahootByCodePin(this.codePin);  
  }

  async getMiahootById(id: string) {
    let miahootDocRef = doc(this.fs, `miahootProjected/${id}`);
    let snapMiahoot = await getDoc(miahootDocRef);
    this.miahootProjected = snapMiahoot.data() as MiahootProjected;
  }

  async getMiahootByCodePin(codePin: string) {
    let miahoot;
    const miahootProjectedCollectionRef = collection(this.fs, 'miahootProjected');
    const req = query(miahootProjectedCollectionRef, where('pin', '==', parseInt(codePin, 10)));
    const snap = await getDocs(req);
    snap.forEach((doc) => {
      miahoot = doc.data();
    });
    return miahoot;
  }
  

  async submitCodePin() {
    if(this.authService.getIsLoggedIn()){
      localStorage.setItem('nom',this.authService.getUsername());
    }else{
      localStorage.setItem('nom',this.nom);
    }
    
    this.miahootProjected  = await this.getMiahootByCodePin(this.codePin);
    console.log(this.miahootProjected);
    if(this.miahootProjected){
      this.router.navigate(['participant/'+this.miahootProjected.pin]);
    }
  }

  subscribeToPresenterInstructions() {
    const instructionsDocRef = doc(
      this.fs,
      `presenterInstructions/${this.miahootId}`
    );
    onSnapshot(instructionsDocRef, (snapshot) => {
      const instructions = snapshot.data();
    });
  }

  selectResponse(responseIndex: number) {
    if (!this.isQuestionAnswered()) {
      this.selectedResponses.push(responseIndex);
    }
  }

  isQuestionAnswered(): boolean {
    return this.selectedResponses.length > 0;
  }

  submitQuestion() {
    console.log(this.selectedResponses);
    this.selectedResponses = [];
  }

  moveToNextQuestion() {
    if (
      this.currentQuestionIndex <
      this.miahootProjected.currentQCM.length - 1
    ) {
      this.currentQuestionIndex++;
    }
  }

  moveToPreviousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }


}

