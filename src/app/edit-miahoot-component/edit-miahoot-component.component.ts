import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { MiahootService } from '../miahoot.service';
import { NgModel } from '@angular/forms';
import { Miahoot, FormElement } from '../data.service';

const QUESTION_DATA: FormElement = {question: "oui?", reponses: ["oui", "non"]}

const ELEMENT_DATA: Miahoot = {
  name: "Test",
  questions: [QUESTION_DATA,QUESTION_DATA,QUESTION_DATA]
}

@Component({
  selector: 'app-edit-miahoot',
  templateUrl: './edit-miahoot-component.component.html',
  styleUrls: ['./edit-miahoot-component.component.scss']
})
export class EditMiahootComponent {
  // miahoot: any;
  // miahoot: Miahoot;
  miahootId: any;
  miahoot = ELEMENT_DATA;
  clicked = false;

  affiche(){
    this.clicked = !this.clicked;
  }

  // constructor(private route: ActivatedRoute, private miahootService: MiahootService) { }
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.miahootId = this.route.snapshot.paramMap.get('id');
    // this.getMiahoot(this.miahootId);
  }

  // getMiahoot(id: any) {
  //   this.miahootService.getMiahootById(id).subscribe((data: any) => {
  //     this.miahoot = data;
  //   });
  // }

  saveChanges() {
    // this.miahootService.updateMiahoot(this.miahoot).subscribe((data: any) => {
    //   console.log('Saved changes to miahoot:', data);
    // });
  }
  createNewQuestion(){
    //Creation d'une nouvelle question
  }

  deleteQuestion(){
    //Creation d'une nouvelle question
  }
}
