import { Component, ElementRef, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MiahootService } from '../services/miahoot.service';
import { Miahoot } from '../models/models';

interface QuestionReponses {
  question: string;
  reponses: string[];
  estCorrecte: boolean[];
}

@Component({
  selector: 'app-new-miahoot',
  templateUrl: './new-miahoot.component.html',
  styleUrls: ['./new-miahoot.component.scss'],
})
export class NewMiahootComponent implements OnInit {

  questRep: QuestionReponses[] = [];
  newQuestion = '';
  newReponses: string[] = [];
  newCorrect: boolean[] = [];
  miahoots: Miahoot;
  id = Number(this.route.snapshot.paramMap.get('id'));
  estValide: boolean;
  updateValide : boolean;
 
  constructor(private route: ActivatedRoute, private miService: MiahootService) { }

  ngOnInit() {
    console.log(this.id + " initialized");
    this.miService.getMiahoot(this.id)
    .then(miahoot => {
      console.log(miahoot);
      this.miahoots = miahoot;
      this.miahoots.questions?.sort((a, b) => {
        if (a.id !== undefined && b.id !== undefined) {
          return a.id - b.id;
        } else {
          return 0;
        }
      });
      for(let i = 0; this.miahoots.questions?.length !== undefined && i < this.miahoots.questions?.length ; i++ ){
        this.miahoots.questions[i].responses?.sort((a, b) => {
          if (a.id !== undefined && b.id !== undefined) {
            return a.id - b.id;
          } else {
            return 0;
          }
        });
      }
    })
    .catch(err => console.error(err));
  }

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

  saveRep(j: number, id : number | undefined) {
    let rep = document.querySelector<HTMLInputElement>(`#editRéponse-${j}`)?.value;       
    this.miService.updateReponse(id,{label:rep,estValide:this.updateValide,modifiable:false})
                  .then(() => { this.ngOnInit() }); 
  }

  saveQuest(i: number , id : number | undefined){
    let ques = document.querySelector<HTMLInputElement>(`#editQuestion-${i}`)?.value;       
    this.miService.updateQuestion(id,{label : ques,modifiable : false})
                  .then(() => { this.ngOnInit() }); 
  }

  supprimeQuest(id: number | undefined){
    this.miService.deleteQuestion(id).then(() => { this.ngOnInit() });
  }

  supprimeRep(id : number | undefined){
    this.miService.deleteReponse(id).then(() => { this.ngOnInit() });
  }
 
  ajouterQuestion(){
    this.miService.createQuestion(this.id,{label:this.newQuestion}).then(() => { this.ngOnInit() });
  }

  ajouterReponse(i: number,questId: number | undefined){
    let rep = document.querySelector<HTMLInputElement>(`#réponse-${i}`)?.value;
    if(rep != null){
      if (rep.trim()) {
        this.miService.createReponse(questId,{label:rep,estValide:this.estValide}).then(() => { this.ngOnInit() });
        document.querySelector<HTMLInputElement>(`#réponses-${i}`)!.value = '';
        this.newCorrect[i] = false;
      }
  }
  
}
}
