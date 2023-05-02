import { Component, OnInit, OnDestroy, Optional } from '@angular/core';
import { Auth, authState, signInAnonymously, signOut, User, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { traceUntilFirst } from '@angular/fire/performance';
import { FsUserConverter } from '../data.service';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { MiahootUser } from '../data.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  private readonly userDisposable: Subscription|undefined;
  public readonly user: Observable<User | null> = EMPTY;

  showLoginButton = false;
  showLogoutButton = false;

  constructor(private auth: Auth, private fs : Firestore) {
    if (auth) {
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u => !!u),
      ).subscribe((isLoggedIn: boolean) => {
        this.showLoginButton = !isLoggedIn;
        this.showLogoutButton = isLoggedIn;
      });
    }

    // authState(this.auth).pipe(
    //   filter( u => !!u ),
    //   map( u => u as User ),
    //   tap( async u => {
    //     if(!u.isAnonymous){
    //       const docUser =  doc(this.fs, `users/${u.uid}`).withConverter(FsUserConverter) ;
    //       const snapUser = await getDoc( docUser );
    //       if (!snapUser.exists()) {
    //         setDoc(docUser, {
    //           name: u.displayName ?? u.email ?? u.uid,
    //           mail: u.email ?? "",
    //           miahootProjected: 0,
    //           // photoURL: u.photoURL ?? "https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
    //         } satisfies MiahootUser)
    //     }
    //     }
    //   })
    //   ).subscribe((isLoggedIn: boolean) => {
    //         this.showLoginButton = !isLoggedIn;
    //         this.showLogoutButton = isLoggedIn;
    //       });
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

  async login() {
    // this.router.navigate(['/my-miahoots']);
    // return await signInWithPopup(this.auth, new GoogleAuthProvider());
    const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
    try {
      await signInWithPopup(this.auth, googleProvider);
    } catch(err) {
      console.error("On a tué brutalement la fenetre de log...")
    }
    
  }

  async loginAnonymously() {
    return await signInAnonymously(this.auth);
  }

  async logout() {
    return await signOut(this.auth);
  }
}
