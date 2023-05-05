import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { addDoc, collection, doc, docData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { EMPTY, from, Observable, of, switchMap, tap } from 'rxjs';
import { FsUserConverter, MiahootUser } from '../data.service';
import { MiahootService } from '../services/miahoot.service';
<<<<<<< HEAD
// import { Miahoot } from '../models/models';

=======
import { CreateMihaootComponent } from '../create-mihaoot/create-mihaoot.component';
import { MatDialog } from '@angular/material/dialog';
>>>>>>> eb11b5302759e3873c023de08b251b589943f9ac

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
export class MyMiahootsComponent implements AfterViewInit, OnInit {
  idTeacher = this.route.snapshot.paramMap.get('id');
  displayedColumns: string[] = ['id', 'name', 'date', 'status' ,'actions'];
  dataSource: MatTableDataSource<any>;

  public user: User | null = null;

  constructor(
    private router: Router, 
    private auth: Auth, 
    private fs : Firestore, 
    private miService : MiahootService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {
    authState(auth).subscribe((user) => {
      this.user = user;
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    const id = (this.route.snapshot.paramMap.get('id'));
    this.miService.miahootsByTeacherId(id)
    .then(miahoot => {
      console.log(miahoot);
      
      this.dataSource = new MatTableDataSource(miahoot);
    })
    .catch(err => console.error(err));
  }
    //popup create miahoot
    openNewMiahootDialog() {
      const dialogRef = this.dialog.open(CreateMihaootComponent, {
        data: { teacherId: this.idTeacher }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    return;
  }

<<<<<<< HEAD
  editMiahoot(miahoot: Miahoot) {
    this.router.navigate(['/new-miahoot/'+miahoot.id]);
=======
  editMiahoot(miahootId: number) {
    this.router.navigate(['/new-miahoot/'+miahootId]);
>>>>>>> eb11b5302759e3873c023de08b251b589943f9ac
  }

  deleteMiahoot(id:number,miahoot: Miahoot): void {
    this.dataSource.data = this.dataSource.data.filter(m => m !== miahoot);
    this.miService.deleteMiahoot(id)
                  .then(() => console.log("miahoot deleted"))
                  .catch(err=> console.log(err));
  }

  async lectureMiahoot(miahootId: number){
    // Update the user's projectedMiahoot field in Firestore
    if (this.user) {
      const userId = this.user.uid;
      const docRef = doc(this.fs, `users/${userId}`);
      updateDoc(docRef, { projectedMiahoot: miahootId }).then(() => {
        this.router.navigate(['/presentateur/' + miahootId]);
      }).catch((error) => {
        console.error('Error updating Firestore document:', error);
        return;
      });
    }
    ///////////////////////////////////////////////////////////////////////////////////
    //Ajouter le miahoot correspondant au miahootId a la collection projectedMiahoots//
    ///////////////////////////////////////////////////////////////////////////////////
    // const miahoot = this.miService.getMiahoot(miahootId);
    // if (!miahoot) {
    //     console.error(`Miahoot ${miahootId} not found`);
    //     return;
    // }
    // const docUser = doc(fs, `users/${U.uid}`).withConverter(FsUserConverter);
    // Create the projectedMiahoot document
    // const projectedMiahootRef = await addDoc(collection(this.fs, 'projectedMiahoots'), {
    //     name: (await miahoot).nom,
    //     // currentQCM: miahoot.QCMs[0].question
    //     currentQCM: (await miahoot).questions?[0]
    // });

    // Add the QCMs to the projectedMiahoot document
    // for (const qcm of (await miahoot).questions) {
    //     const qcmDocRef = await addDoc(collection(projectedMiahootRef, 'QCMs'), {
    //         question: qcm.question,
    //         responses: qcm.responses
    //     });

    //     // Add the votes subcollection to the QCM document
    //     for (let i = 0; i < qcm.responses.length; i++) {
    //         await setDoc(doc(qcmDocRef, `votes/${i}`), {});
    //     }
    // }

    // Update the user's projectedMiahoot field in Firestore
    // if (this.user) {
    //     const userId = this.user.uid;
    //     const docRef = doc(this.fs, `users/${userId}`);
    //     await updateDoc(docRef, { projectedMiahoot: projectedMiahootRef.id });
    // }

  }

  createNewMiahoot(){
<<<<<<< HEAD
    // const lastElement = ELEMENT_DATA.slice(-1)[0];
    // const lastId = lastElement.id+1;
    // this.router.navigate(['/new-miahoot/'+lastId]);
    return;
=======
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    this.router.navigate(['/new-miahoot/'+id]);
>>>>>>> eb11b5302759e3873c023de08b251b589943f9ac
  }
  
  getStatusDisplayValue(status: string): string {
    if (status === 'PRESENTED') {
      return 'Présenté';
    } else if (status === 'NOT_PRESENTED') {
      return 'Pas encore présenté';
    } else {
      return '';
    }
  }

}
