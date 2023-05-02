import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil-component.component.html',
  styleUrls: ['./accueil-component.component.scss']
})

export class AccueilComponent {
  pin: number;
  nom: string;
  pins = [1234, 5432, 1312];
  pinSaisi = false;
  pinValide = false;
  nomSaisi = false;

  validerPin() {  
    this.pinSaisi = true;
    this.pinValide = this.pins.includes(this.pin);
    if (this.pinValide) {
      this.nomSaisi = false;
    }
  }

  validerNom() {
    this.nomSaisi = !!this.nom;
  }


  test(){
    console.log(this.nom);
  }

}

