import { Injectable } from '@angular/core';
import { Auth, User, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


export interface MiahootUser{
  readonly name:string;
  readonly mail:string;
  readonly miahootProjected:number
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUser : Observable< User | null > = authState(this.auth);

  constructor(private fireauth : AngularFireAuth, private router : Router, private auth : Auth) {}

  login(email : string , password : string) : void {
    this.fireauth.signInWithEmailAndPassword(email, password).then( () : void =>{
      localStorage.setItem('token','true');
      this.router.navigate(['enseignant']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    }
    )}
    

    register(email : string, password : string) : void {
      this.fireauth.createUserWithEmailAndPassword(email, password).then( () : void =>{
        alert('Registration Successful');
        this.router.navigate(['/login']);
      }, err => {
        alert(err.message);
        this.router.navigate(['/register']);
      })
    }

    logout():void {
      this.fireauth.signOut().then(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      }, error =>{
        alert(error.message)
      })
    }
  
    googleSignIn(userType: number): void {      
      this.fireauth.signInWithPopup(new GoogleAuthProvider())
        .then(res => {
          const user = res.user;
          if (user) {
            const miahootUser: MiahootUser = {
              name: user.displayName || '',
              mail: user.email || '',
              miahootProjected: 0
            };
            firebase.firestore().collection('users').doc(user.uid).set(miahootUser)
              .then(() => {
                localStorage.setItem('token', JSON.stringify(user.uid));
                localStorage.setItem('userType', JSON.stringify(userType));
                if (userType == 1){
                  this.router.navigate(['/my-miahoots']);
                } else {
                  this.router.navigate(['/participant/1']);
                }
              })
              .catch(error => console.error(error));
          } else {
            console.error('User object is null.');
          }
        })
        .catch(error => console.error(error));
    }
    
    
    
  
    anonymousLogin():void{
      this.fireauth.signInAnonymously()
      .then(() => console.log("connexion anonyme marche"))
      .catch(()=>console.log("erreur lors de la connexion"))
    }
  
  }