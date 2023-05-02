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
      authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u => !!u),
        tap(async (isLoggedIn: boolean) => {
          if (isLoggedIn) {
            const user = await this.auth.currentUser;
            if (user) {
              const userDocRef = doc(this.fs, `users/${user.uid}`).withConverter(FsUserConverter);
              const snapUser = await getDoc(userDocRef);
              if (!snapUser.exists()) {
                setDoc(userDocRef, {
                  name: user.displayName ?? user.email ?? user.uid,
                  mail: user.email ?? "",
                  miahootProjected: 0,
                } as MiahootUser);
              }
            }
          }
        })
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
    const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
    try {
      const credential = await signInWithPopup(this.auth, googleProvider);
      const user = credential.user;
      if (user) {
        const userDocRef = doc(this.fs, `users/${user.uid}`).withConverter(FsUserConverter);
        const snapUser = await getDoc(userDocRef);
        if (!snapUser.exists()) {
          setDoc(userDocRef, {
            name: user.displayName ?? user.email ?? user.uid,
            mail: user.email ?? "",
            miahootProjected: 0,
          } as MiahootUser);
        }
      }
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
