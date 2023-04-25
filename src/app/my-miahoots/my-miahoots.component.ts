import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface Miahoot {
  id: number;
  name: string;
  date: Date;
}
const ELEMENT_DATA: Miahoot[] = [
  {id: 1, name: "questionnaire zz", date: new Date("2023-04-25")},
  {id: 2, name: "questionnaire aaa", date: new Date("01/05/2001")},
  {id: 3, name: "questionnaire bbb", date: new Date("2001-05-01")},
  {id: 4, name: "questionnaire alm", date: new Date()},
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
  displayedColumns: string[] = ['id', 'name', 'date', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  editMiahoot(miahoot: Miahoot) {
    // Action à effectuer lors de la modification d'un Miahoot
  }

  deleteMiahoot(miahoot: Miahoot) {
    // Action à effectuer lors de la suppression d'un Miahoot
  }
}
