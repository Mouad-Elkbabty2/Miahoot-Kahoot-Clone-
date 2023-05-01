import { Component, Input } from '@angular/core';



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

  qcmCourant : QCMProjected = qcmCourant;
  participants: string[];

  constructor() {}

  get question(): string {
    return this.qcmCourant.question;
  }

  get responses(): string[] {
    return this.qcmCourant.responses;
  }

  setVotes(votes: any) {
    // TODO: Afficher les votes dans l'interface
  }
}
