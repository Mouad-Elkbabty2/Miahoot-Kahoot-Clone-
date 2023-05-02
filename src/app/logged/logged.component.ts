import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { map, Observable, of, switchMap } from 'rxjs';
import { DataService, FsUserConverter } from '../data.service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoggedComponent {
  readonly obsProjectedMiahootID: Observable<number> | undefined;

  constructor(private auth: Auth, private fs: Firestore){
  //   switchMap(U => {
    
  //     if (U == null){
  //       return of(undefined);
  //     } else{
  //       const docUser = doc(fs, 'users/$(U.uid)').withConverter(FsUserConverter);
  //       return docData(docUser).pipe(
  //         map(miahootUser => miahootUser.MiahootProjected)
  //       )
  //     }
  //   }
  //   )
  }
}
