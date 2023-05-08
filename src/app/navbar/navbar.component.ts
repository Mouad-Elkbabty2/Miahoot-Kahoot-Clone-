import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private userImage : string | null | undefined;
  constructor(private router: Router,public authS : AuthService) { }
  
  onLoginClick() {
    this.router.navigate(['/my-miahoots']);
  }

  ngOnInit(){
    console.log(this.authS.getIsLoggedIn(),this.authS.getUid());
  }

  getUserImage(){
    this.authS.userSubject.subscribe(user => this.userImage = user?.photoURL);
     if(this.userImage){
      return this.userImage;
     }else{
      return "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg"
     }
  }
}