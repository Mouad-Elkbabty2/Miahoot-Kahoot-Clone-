import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { EMPTY, from, Observable, of, switchMap, tap } from 'rxjs';
import { FsUserConverter, MiahootUser } from '../data.service';
import { MiahootService } from '../services/miahoot.service';


export interface Miahoot {
  id: number;
  name: string;
  date: Date;
  status : String;
}
const ELEMENT_DATA: Miahoot[] = [
  {id: 1, name: "questionnaire zz", date: new Date("2023-04-25"),status:"en attente"},
  {id: 2, name: "questionnaire aaa", date: new Date("01/05/2001"),status:"en attente"},
  {id: 3, name: "questionnaire bbb", date: new Date("2001-05-01"),status:"en attente"},
  {id: 4, name: "questionnaire alm", date: new Date("2001-09-11"),status:"présenté"},
];
/**
 * @title Table with sorting
 */
@Component({
  selector: 'app-my-miahoots',
  templateUrl: './my-miahoots.component.html',
  styleUrls: ['./my-miahoots.component.scss']
})
export class MyMiahootsComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'date', 'status' ,'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  public user: User | null = null;

  constructor(
    private router: Router, 
    private auth: Auth, 
    private fs : Firestore, 
    private miService : MiahootService
  ) {
    authState(auth).subscribe((user) => {
      this.user = user;
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  editMiahoot(miahoot: Miahoot) {
    let id : number = miahoot.id;
    this.router.navigate(['/new-miahoot/'+miahoot.id]);
  }

  deleteMiahoot(miahoot: Miahoot): void {
    this.dataSource.data = this.dataSource.data.filter(m => m !== miahoot);
  }

  lectureMiahoot(miahootId: number){
    //Ajouter le miahoot correspondant au miahootId a la collection projectedMiahoots
    const miahoot = this.miService.getMiahoot(miahootId);

    // Update the user's projectedMiahoot field in Firestore
    if (this.user) {
      const userId = this.user.uid;
      const docRef = doc(this.fs, `users/${userId}`);
      updateDoc(docRef, { projectedMiahoot: miahootId }).then(() => {
        this.router.navigate(['/presentateur/' + miahootId]);
      }).catch((error) => {
        console.error('Error updating Firestore document:', error);
      });
    }
  }

  createNewMiahoot(){
    const lastElement = ELEMENT_DATA.slice(-1)[0];
    const lastId = lastElement.id+1;
    this.router.navigate(['/new-miahoot/'+lastId]);
  }
  
}
