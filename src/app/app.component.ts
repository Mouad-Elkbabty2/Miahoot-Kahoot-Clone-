import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projetIntegrateur';

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
