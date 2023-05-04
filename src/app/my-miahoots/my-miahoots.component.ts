import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';


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

  constructor(private _liveAnnouncer: LiveAnnouncer,private router: Router) {}

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

  lectureMiahoot(miahoot: Miahoot){
    console.log(miahoot.id);
    let id : number = miahoot.id;
    this.router.navigate(['/presentateur/'+id]);

    //Modifier sur firebase le projected Miahoot pour l'utilisateur connecté}

      //Créer la collection Projected Miahoots

        //Dans cette collection creer un Miahoot avec les données du miahoot passé en paramètre

          //Sous collection QCM

            //Sous collection votes qui fera référence aux utilisateurs

              //Sous collection réponse

  }

  createNewMiahoot(){
    const lastElement = ELEMENT_DATA.slice(-1)[0];
    const lastId = lastElement.id+1;
    this.router.navigate(['/new-miahoot/'+lastId]);
  }
  
}
