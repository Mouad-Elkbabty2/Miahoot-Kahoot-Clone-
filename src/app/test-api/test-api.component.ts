import { Component, OnInit } from '@angular/core';
import { MiahootService } from '../services/miahoot.service';
import { Teacher } from '../models/models';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-test-api',
  templateUrl: './test-api.component.html',
  styleUrls: ['./test-api.component.scss']
})
export class TestApiComponent implements OnInit {

  questionId: number;
  question: any;
  message: string;
  label: string;
  teacherId: number;
  miahootId : number;

  constructor(private miService: MiahootService) { }

  ngOnInit(): void {
    //get teacher
    this.miService.getTeacher(6)
      .then(teacher => console.log(teacher));
  }

  //get Miahoot
  getMiahoot() {
    this.miService.getMiahoot(this.miahootId)
      .then(miahoot => console.log(miahoot))
      .catch(err => console.error(`Mihaoot avec l'id ${this.miahootId} introuvable dans la BDD`, err));
  }

  // delete miahoot
  delete(id: number) {
    this.miService.deleteMiahoot(id)
      .then(() => {
        console.log("miahoot deleted successfully");
      })
      .catch((error) => {
        console.error(error);
      });

  }

  createMiahoot() {
    const miahoot = {};
    this.miService.createMiahoot(miahoot,this.teacherId)
      .then(() => {
        console.log("Miahoot created successfully");
      })
      .catch(error => {
        console.error(error);
        console.log("Failed to create miahoot. Please try again.");
      });
  }

  updateMiahoot(id:number) {
    const miahoot = {};
    this.miService.updateMiahoot(id,miahoot)
      .then(() => {
        console.log("Miahoot updated successfully");
      })
      .catch(error => {
        console.error(error);
        console.log("Failed to update miahoot. Please try again.\n error : ",error.status+ " "+ error.statusText);
      });
  }


  //----------------- API Question -----------------------

  // get question by id
  getQuestion(id: number) {
    this.miService.getQuestion(id)
      .then((response: any) => {
        this.question = response;
      })
      .catch((error) => {
        console.error(`Question avec id '${id}' est introuvable dans la BDD`, error);
      });
  }


  // delete question by id
  deleteQuestion(id: number): void {
    this.miService.deleteQuestion(id)
      .then(() => console.log("question deleted successfully"))
      .catch(error => console.error(error));
  }

  // create question
  createQuestion(id: number) {
    const question = { label: "Nouvelle question", miahoot: undefined, responses: [] };
    this.miService.createQuestion(id, question)
      .then((response: any) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // update question label by id
  updateQuestionLabel(id: number, label: string): void {
    this.miService.updateQuestion(id, label)
      .then(response => console.log(response))
      .catch(error => console.error(error));
  }


  //----------------- API Teacher -----------------------
  createTeacher() {
    this.miService.createTeacher({nom : "Mr Bouhaliw"})
      .then((teacher) => {
        console.log("teacher added successfully id :" +teacher.id);
        return teacher;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  deleteTeacher() {
    this.miService.deleteTeacher(this.teacherId)
      .then((teacher) => {
        console.log("teacher deleted successfully", teacher);
      })
      .catch((error) => {
        console.error(error);
      });
  }

}
