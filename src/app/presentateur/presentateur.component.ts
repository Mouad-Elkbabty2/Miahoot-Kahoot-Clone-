import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Miahoot, MiahootProjected, QCMProjected, Question } from '../models/models';
import { doc, getDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { FsMiahootProjectedConverter } from '../data.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-presentateur',
  templateUrl: './presentateur.component.html',
  styleUrls: ['./presentateur.component.scss']
})

export class PresentateurComponent {

  i = 0;
  miahoot : unknown ;
  miahootProjected : MiahootProjected;
  indexQuestion : number = 0;
  qcmCourant : QCMProjected;
  showAnswers = false;
  disable = true;
  miahootId = this.route.snapshot.paramMap.get('id');

  constructor(private router: Router, private route : ActivatedRoute, private fs : Firestore,private auth : AuthService){}

  ngOnInit(): void {
    this.getMiahootById(this.miahootId ?? "");
  }

  async getMiahootById(id: string) {
    const miahootDocRef = doc(this.fs, `miahootProjected/${id}`).withConverter(FsMiahootProjectedConverter);
    const snapMiahoot = await getDoc(miahootDocRef);
    this.miahootProjected = snapMiahoot.data() as MiahootProjected;
    
  }

     questionSwitcher(i : number){
      this.i += i;
    }

    afficherRep(){
      this.showAnswers = !this.showAnswers;
    }

  setVotes(votes: any) {
    // TODO: Afficher les votes dans l'interface
  } 

  retToMyMiahoot(){
    this.router.navigate(['/my-miahoots/'+this.auth.getUid()]);
  }
}

