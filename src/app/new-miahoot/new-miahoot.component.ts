import { Component, ElementRef, HostListener } from '@angular/core';

interface QuestionReponses {
  question: string;
  reponses: string[];
  estCorrecte: boolean[];
}

@Component({
  selector: 'app-new-miahoot',
  templateUrl: './new-miahoot.component.html',
  styleUrls: ['./new-miahoot.component.scss']
})
export class NewMiahootComponent {
  questRep: QuestionReponses[] = [];
  newQuestion = '';
  newReponses: string[] = [];
  newCorrect: boolean[] = [];
  editable = false;
  tempReponses: string[] = [];
  editingIndex: number[] = [];


  constructor(private elementRef: ElementRef){}
  onSubmit() {
    // Vérifier si la nouvelle question n'est pas vide (après avoir enlevé les espaces blancs)
    if (this.newQuestion.trim()) {
      this.questRep.push({
        question: this.newQuestion,
        reponses: this.newReponses.filter((reponse) => reponse.trim()), // filtre les réponses vides (après avoir enlevé les espaces blancs)
        estCorrecte: this.newCorrect
      });
      this.newQuestion = '';
      this.newReponses = [];
      this.newCorrect = [];
    }
  }

  ajouteRep(i: number) {
    // Vérifier si la nouvelle réponse n'est pas vide (après avoir enlevé les espaces blancs)
    if (this.tempReponses[i].trim()) {
      this.questRep[i].reponses.push(this.tempReponses[i]);
      this.tempReponses[i] = '';
      this.newCorrect[i] = false;
    }
}

  saveRep(i: number, j: number) {
    this.questRep[i].reponses[j] = this.tempReponses[i];
    this.editingIndex = [];
  }
  
  supprimeQuest(i:number){
    this.questRep.splice(i,1);
  }

  supprimeRep(i:number,j:number){
    this.questRep[i].reponses.splice(j,1);
  }
  editRep(i:number,j:number){
    
    this.editingIndex[i] = j;
    this.tempReponses[i] = this.questRep[i].reponses[j];
  }
  
  
}
