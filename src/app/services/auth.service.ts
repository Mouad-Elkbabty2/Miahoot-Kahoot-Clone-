import { Injectable, OnDestroy } from '@angular/core';
import { Auth, authState, signInAnonymously, signOut, User, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { FsUserConverter, MiahootUser } from '../data.service';
import { MiahootService } from '../services/miahoot.service';
import { Router, RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private readonly userDisposable: Subscription|undefined;
  public readonly user: Observable<User | null> = EMPTY;

  constructor(private auth: Auth, 
              private fs: Firestore, 
              private miService: MiahootService) {
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
                  miahootProjected: 0,
                } as MiahootUser);
              }
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
            miahootProjected: 0,
          } as MiahootUser);
  
          // Create teacher record in Spring Boot backend
          const teacherName = user.displayName || user.email || user.uid;
          this.miService.createTeacher({ nom: teacherName, fireBaseId: user.uid })
            .then((teacher) => {
              console.log("Teacher added successfully");
              // Update user document with teacherId
            })
            .catch((error) => {
              console.error(error);
            });
        }
        localStorage.setItem('userType', JSON.stringify(userType));
      }
      return user.uid;
    } catch (err) {
      console.error("Error:" + err);
      return '';
    }
  }
  

  async loginAnonymously() {
    return await signInAnonymously(this.auth);
  }

  async logout() {
    localStorage.clear();
    return await signOut(this.auth);
  }
}
