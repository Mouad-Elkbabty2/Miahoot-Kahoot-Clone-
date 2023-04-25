import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil-component.component.html',
  styleUrls: ['./accueil-component.component.scss']
})
export class AccueilComponent{
  constructor(private router: Router) { }
  onLoginClick() {
    this.router.navigate(['/my-miahoots']);
  }
}
