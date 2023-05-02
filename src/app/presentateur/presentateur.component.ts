import { Component, Input } from '@angular/core';
import { MiahootService } from '../services/miahoot.service';
import { Miahoot } from '../services/miahoot.service';



export type VOTES = { 
    [participantUID: string]: boolean
  };

export interface QCMProjected { 
    question: string; 
    responses: string[]; // Les réponses possibles 
    votes: VOTES; // Autant d'entrée dans le tableau que de réponses possibles 
  };

  const pipo: VOTES = { 

    "Alexandre Demeure": true,
    Bill: true, 
    Jo: true, 
    chibany: true, 
};

  const qcmCourant : QCMProjected = { 
    question: "ca va mec",
    responses: ["oui", "non"],
    votes : pipo,

};




@Component({
  selector: 'app-presentateur',
  templateUrl: './presentateur.component.html',
  styleUrls: ['./presentateur.component.scss']
})

export class PresentateurComponent {

  qcmCourant : number = 0;
  participants: string[];
  //miahoot$ = this.miahootService.obsProjectedMiahoot;
  miahoots : Miahoot[] = [
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

  miahoot : Miahoot = this.miahoots[0];

  constructor(private miahootService: MiahootService){}



  setVotes(votes: any) {
    // TODO: Afficher les votes dans l'interface
  }
}
