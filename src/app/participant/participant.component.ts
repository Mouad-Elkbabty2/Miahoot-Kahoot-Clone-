import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnInit {

  //@Input() questionId!: number 
  //@Input() label!:String 
  //@Input() reponses!:Reponse[]

  questionId: number;
  reponses: string[];
  question: string;
  reponseSelectionnee: string | null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.questionId = parseInt(this.route.snapshot.paramMap.get('id') ?? '-1', 10);
    this.chargerReponses();
    this.chargerQuestion();
  }

  chargerQuestion() {
    // Charger la question à partir de l'API
    // Remplacer ce code par l'appel à l'API
    this.question = 'Quelle est la capital du Maroc ?';
    /* exemple : this.http.get<any>(`/api/questions/${this.questionId}`).subscribe(data => {
      this.question = data.question;
    }); */
  }

  chargerReponses() {
    // Charger les réponses à partir de l'API
    // Remplacer ce code par l'appel à l'API
    this.reponses = ['Marrakech', 'Casablanca', 'Alger','Kenitra'];
  }

  selectionnerReponse(reponse: string) {
    if (this.reponseSelectionnee === reponse) {
      this.reponseSelectionnee = null;
    } else {
      this.reponseSelectionnee = reponse;
    }
  }
  
}
