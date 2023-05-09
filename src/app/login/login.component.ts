import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  islogin = true;
  error = false;

  constructor(private auth : AuthService,private router : Router){}

  async login(userType: number) {
    this.auth.login(userType).then( id =>{
  
      // Navigate based on userType
      if (userType === 1) {
        this.router.navigate([`/my-miahoots/${id}`]);  
      } else {
        this.router.navigate(['/participant']);
      }
    }).catch(err=>console.log("Error:"+err));

  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
