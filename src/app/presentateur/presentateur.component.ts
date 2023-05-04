import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Miahoot, Question } from '../models/models';

@Component({
  selector: 'app-presentateur',
  templateUrl: './presentateur.component.html',
  styleUrls: ['./presentateur.component.scss']
})

export class PresentateurComponent {

  
  //miahoot$ = this.miahootService.obsProjectedMiahoot;
/*   miahoots : Miahoot[] = [
    
    { id: 2}
    ,{
      id: 1,
      participants: [{ id: 0,
                        nom: "demeure",
                        participantMiahoot: 0}],
      nom: "qcm angular",
      questions: [{
        id : 1,
        label: "Quel est le plus grand pays du monde en termes de surface ?",
        responses: [{id: 1, label :"Russie", estValide: true,question:''}, {id: 2, label :"Chine", estValide: false,question:''}, 
        {id: 3, label :"États-Unis", estValide: false,question:''}, {id: 4, label :"Canada", estValide: false,question:''}],
      }, {
      
      id : 2,
      label: "Quel est le plus grand pays du monde en termes de superficie en eau ?",
      responses: [{id: 1, label :"Australie", estValide: false,question:''}, {id: 2, label :"Qatar", estValide: false,question:''}, 
      {id: 3, label :"Arabie saoudite", estValide: false,question:''}, {id: 4, label :"Tunisie", estValide: true,question:''}]},

      {
      
        id : 3,
        label: "est ce quet'es loubya ?",
        responses: [{id: 1, label :"oui", estValide: false,question:''}, {id: 2, label :"non", estValide: false,question:''}, 
        {id: 3, label :"maybe", estValide: false,question:''}, {id: 4, label :"nahwi mk", estValide: true,question:''}]}
    
    ]
    }] */


  miahoot : Miahoot ;
  miahootProjected : number;
  indexQuestion : number = 0;
  qcmCourant : Question;
  showAnswers = false;
  disable = true;

  constructor(private router: Router, private route : ActivatedRoute){}

  ngOnInit(): void {
    this.miahootProjected = parseInt(this.route.snapshot.paramMap.get('id') ?? '-1', 10);
    //this.miahoot = this.miahoots[this.miahootProjected];
    if(this.miahoot.questions !== undefined){
      this.disable = false;
      this.qcmCourant = this.miahoot.questions[this.indexQuestion];
    }
  }

    questionSwitcher(i : number){
      this.indexQuestion += i;
      if (this.miahoot.questions !== undefined && this.indexQuestion >= 0 && this.indexQuestion < this.miahoot.questions.length) {
        this.qcmCourant = this.miahoot.questions[this.indexQuestion];
      }
      this.showAnswers = false;
    }

    afficherRep(){
      this.showAnswers = !this.showAnswers;
    }

  setVotes(votes: any) {
    // TODO: Afficher les votes dans l'interface
  }

  retToMyMiahoot(){
    this.router.navigate(['/my-miahoots/']);
  }
}

