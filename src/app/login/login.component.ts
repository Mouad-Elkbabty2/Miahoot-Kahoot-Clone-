import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  islogin = true;
  error = false;

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(private loginService: LoginService) {}

  login(): void {
    this.loginService.login('votre_email', 'votre_mot_de_passe');
  }

  googleSignIn(userType : number){
    this.loginService.googleSignIn(userType);
  }

  logout(): void {
    this.loginService.logout();
  }

}
