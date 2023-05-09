import { Injectable, OnDestroy } from '@angular/core';
import { Auth, authState, signInAnonymously, signOut, User, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { BehaviorSubject, EMPTY, Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { FsUserConverter, MiahootUser } from '../data.service';
import { MiahootService } from '../services/miahoot.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private readonly userDisposable: Subscription | undefined;
  public user: Observable<User | null> = EMPTY;
  public userSubject = new BehaviorSubject<User | null>(null);
  private isLoggedIn: boolean = false;
  private uid: string;

  constructor(private auth: Auth,
    private router: Router,
    private fs: Firestore,
    private miService: MiahootService,
    private fa: AngularFireAuth) {
    const storedUid = localStorage.getItem('uid');
    
    if (storedUid) {
      this.isLoggedIn = true;
      this.uid = storedUid;
    }

    if (auth) {
      authState(this.auth).pipe(
        tap(async (U: User | null) => {
          if (!!U) {
            const user = U; // await this.auth.currentUser;
            if (user) {
              const userDocRef = doc(this.fs, `users/${user.uid}`).withConverter(FsUserConverter);
              const snapUser = await getDoc(userDocRef);
              if (!snapUser.exists()) {
                setDoc(userDocRef, {
                  name: user.displayName ?? user.email ?? user.uid,
                  mail: user.email ?? "",
                  image : user.photoURL,
                  miahootProjected: '',
                } as MiahootUser);
              }
              // Set uid in local storage on successful login
              this.isLoggedIn = true;
              this.uid = user.uid;
              localStorage.setItem('uid', user.uid);

              this.userSubject.next(user);
            }
          }
        })
      ).subscribe();
    }
  }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }


  async login(userType: number) {
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
          localStorage.setItem('userType', JSON.stringify(userType));
          setDoc(userDocRef, {
            ...snapUser.data(),
            name: user.displayName ?? user.email ?? user.uid,
            mail: user.email ?? "",
            miahootProjected: '',
            image : user.photoURL
          } as MiahootUser);

          const teacherName = user.displayName || user.email || user.uid;
          this.miService.createTeacher({ nom: teacherName, fireBaseId: user.uid })
            .then(() => console.log("Teacher added successfully"))
            .catch((error) => console.error(error));
        }
        this.isLoggedIn = true;
        localStorage.setItem('userType', JSON.stringify(userType));
        this.userSubject.next(user);
      }
      return user.uid;
    } catch (err) {
      console.error("Error:" + err);
      return '';
    }
  }


  async loginAnonymously() {
    this.fa.signInAnonymously()
        .then(()=>console.log("Connexion anonyme établie"))
        .catch(err => console.error(err));
  }

  async logout() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
    return await signOut(this.auth);
  }

  getIsLoggedIn() {
    return this.isLoggedIn;
  }

  getUid() {
    return this.uid;
  }

}
