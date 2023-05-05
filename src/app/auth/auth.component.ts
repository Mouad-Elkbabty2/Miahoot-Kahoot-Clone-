import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '@angular/fire/auth';
import { EMPTY, filter, map, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MiahootService } from '../services/miahoot.service';
import { AuthService } from '../services/auth.service';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  private userDisposable: Subscription|undefined;
  public user: Observable<User | null> = EMPTY;
  public uid: string | null = null;
  public id: string;

  showLoginButton = false;
  showLogoutButton = false;

  constructor( private fs : Firestore, 
    private router : Router, 
    private miService : MiahootService,
    private auth : AuthService) {

      this.showLoginButton = true;
      this.user = this.auth.user;

    
      this.userDisposable = this.auth.user.subscribe((U) => {
        if (U) {
          this.uid = U.uid;
        }
      });
  }

  ngOnInit(): void {
    this.userDisposable = this.auth.user.subscribe((user) => {
      if (user) {
        this.uid = user.uid;
        console.log("user: ", user);
      } else {
        this.uid = null;
      }
    })
  }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

  async login(userType: number) {
    this.auth.login(userType).then( id =>{
      this.showLogoutButton = true; 
      this.showLoginButton = false;
  
      // Navigate based on userType
      if (userType === 1) {
        this.router.navigate([`/my-miahoots/${id}`]);  
      } else {
        this.router.navigate(['/participant/1']);
      }
    }).catch(err=>console.log("Error:"+err));

  }

  async loginAnonymously() {
    return await this.auth.loginAnonymously();
  }

  async logout() {

    this.showLogoutButton = false;
    this.showLoginButton = true;

    localStorage.clear();
    this.router.navigate([`/`]); 
    return await this.auth.logout();
  }
}
