import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MiahootService } from '../services/miahoot.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-mihaoot',
  templateUrl: './create-mihaoot.component.html',
  styleUrls: ['./create-mihaoot.component.scss']
})

export class CreateMihaootComponent implements OnInit{
  label : string;
  teacherId: string;
  date = new Date();

  constructor(private miService: MiahootService,public dialogRef: MatDialogRef<CreateMihaootComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { teacherId: string }
  ) {}
  
  ngOnInit(): void {
    this.teacherId = this.dialogRef.componentInstance.data.teacherId;
  }

  async createMiahoot() {
    try {
      const result = await this.miService.createMiahoot(
        {
          nom: this.label,
          miahootBirthday: this.date,
          status: 1,
        },
        this.teacherId
      );
      console.log(`Miahoot créé : ${JSON.stringify(result)}`);
      this.dialogRef.close(result);
    } catch (err) {
      console.error(`Erreur : ${err}`);
    }
  }
  
}


