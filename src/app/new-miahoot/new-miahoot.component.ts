import { Component, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MiahootService } from '../services/miahoot.service';

interface QuestionReponses {
  question: string;
  reponses: string[];
  estCorrecte: boolean[];
}

interface Miahoot {
  id: number;
  questrep: QuestionReponses[];
}

// Exemple d'objet pour tester la structure Miahoot
const miahoots: Miahoot[] = [
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




@Component({
  selector: 'app-new-miahoot',
  templateUrl: './new-miahoot.component.html',
  styleUrls: ['./new-miahoot.component.scss']
})
export class NewMiahootComponent {

  miahoot: Miahoot;
  questRep: QuestionReponses[] = [];
  newQuestion = '';
  newReponses: string[] = [];
  newCorrect: boolean[] = [];
  editable = false;
  tempReponses: string[] = [];
  editingIndexrep: number[] = [];
  editingQuestionIndex: boolean[]=[];
  //cette variable est pour tester
  questionRep: QuestionReponses;


  constructor(private elementRef: ElementRef, private route: ActivatedRoute,private miahootService: MiahootService ) { }

  ngOnInit() {
    const miahootId = parseInt(this.route.snapshot.paramMap.get('id') ?? '-1', 10);
    this.miahoot = miahoots.find(miahoot => miahoot.id === miahootId) ?? { id: -1, questrep: [{ question: '', reponses: [], estCorrecte: [] }] };
    this.questRep=this.miahoot.questrep;

    this.miahootService.getMiahoot(5).subscribe(miahoot => console.log(miahoot)); 
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

  saveRep(i: number, j: number) {
    if(this.tempReponses[i]){
      this.questRep[i].reponses[j] = this.tempReponses[i];
      this.editingIndexrep = [];
      this.tempReponses[i] = "";
    }
  }

  supprimeQuest(i: number) {
    this.questRep.splice(i, 1);
  }

  supprimeRep(i: number, j: number) {
    this.questRep[i].reponses.splice(j, 1);
  }
  editRep(i: number, j: number) {

    this.editingIndexrep[i] = j;
    this.tempReponses[i] = this.questRep[i].reponses[j];
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
