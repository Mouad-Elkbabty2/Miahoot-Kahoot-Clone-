import { Component, ElementRef,ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MiahootService } from '../services/miahoot.service';
import { Miahoot } from '../models/models';

interface QuestionReponses {
  question: string;
  reponses: string[];
  estCorrecte: boolean[];
}

/* interface Miahoot {
  id: number;
  questrep: QuestionReponses[];
} */

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
  editable = false;
  tempReponses: string[] | undefined [] = [];
  editingIndexrep: number[] = [];
  editingQuestionIndex: boolean[]=[];
  //cette variable est pour tester
  questionRep: QuestionReponses;
  miahoots : Miahoot;
  id = Number(this.route.snapshot.paramMap.get('id'));
  newResp : string;
  estValide : boolean;


  constructor(private elementRef: ElementRef, 
              private route: ActivatedRoute,
              private miService: MiahootService,) { }

  ngOnInit() {
    console.log(this.id+" initialized");
    this.miService.getMiahoot(this.id)
    .then(miahoot => {
      console.log(miahoot);
      this.miahoots = miahoot;
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

  ajouteRep(i: number) {
    let rep = document.querySelector<HTMLInputElement>(`#réponses-${i}`)?.value;
    // Vérifier si la nouvelle réponse n'est pas vide (après avoir enlevé les espaces blancs)
    if(rep != null){
      if (rep.trim()) {
        this.questRep[i].reponses.push(rep);
        document.querySelector<HTMLInputElement>(`#réponses-${i}`)!.value = '';
        this.newCorrect[i] = false;
      }
  }
  }

  saveRep(j: number, id : number | undefined) {
    let rep = document.querySelector<HTMLInputElement>(`#editRéponse-${j}`)?.value;    
    this.miService.updateReponse(id,{label:rep,estValide:false});
    const label = this.miService.getResponseById(id).then(res => res.label)
    this.editingIndexrep[j] = -1;
  }

  supprimeQuest(id: number | undefined){
    this.miService.deleteQuestion(id);
  }

  supprimeRep(id : number | undefined){
    this.miService.deleteReponse(id);
  }
  editRep(i: number, j: number) {
    this.editingIndexrep[i] = j;
  }

  ajouterQuestion(){
    this.miService.createQuestion(this.id,{label:this.newQuestion});
    window.location.reload();
  }

  ajouterReponse(i: number,questId: number | undefined){
    let rep = document.querySelector<HTMLInputElement>(`#réponse-${i}`)?.value;
    if(rep != null){
      if (rep.trim()) {
        this.miService.createReponse(questId,{label:rep,estValide:this.estValide});
        document.querySelector<HTMLInputElement>(`#réponses-${i}`)!.value = '';
        this.newCorrect[i] = false;
      }
  }
}
    // delete miahoot
/*   delete(id: number) {
    this.miahootService.deleteMiahoot(id).subscribe(
      () => console.log("miahoot deleted successfully"),
      error => console.error(error)
    );
  } */

/*   createMiahoot() {
    const miahoot = {};
    this.miahootService.createMiahoot(miahoot);
  }
 */


}
