import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importez FormsModule depuis @angular/forms

interface QuestRep{
  question : String,
  reponses : String[];
}

@Component({
  selector: 'app-new-miahoot',
  templateUrl: './new-miahoot.component.html',
  styleUrls: ['./new-miahoot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewMiahootComponent {
  newQuestion: string = ''; // Variable pour stocker la saisie de l'utilisateur
  questions: [][] = []; // Tableau pour stocker la liste des questions

  newReponse: string = '';

  newQuestRep: QuestRep;
  questRep : QuestRep[];

  ajouteRep(){
    this.newQuestRep.reponses.push(this.newReponse);
    this.newReponse = '';
    console.log("ba333333333333");
    
  }
  onSubmit() {
    this.newQuestRep.question = this.newQuestion;
    this.questRep.push(this.newQuestRep);
  }

}
