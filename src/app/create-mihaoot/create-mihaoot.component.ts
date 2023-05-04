import { Component, Inject, OnInit } from '@angular/core';
import { MiahootService } from '../services/miahoot.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-mihaoot',
  templateUrl: './create-mihaoot.component.html',
  styleUrls: ['./create-mihaoot.component.scss']
})

export class CreateMihaootComponent {
  label : string;
  teacherId: string;
  date = new Date();

  constructor(private miService: MiahootService,public dialogRef: MatDialogRef<CreateMihaootComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { teacherId: string }
  ) {}
  
  async createMiahoot() {
    try {
      const result = await this.miService.createMiahoot({ nom: this.label, miahootBirthday : this.date, status : 1}, this.data.teacherId);
      console.log(`Miahoot created: ${JSON.stringify(result)}`);
      this.dialogRef.close(result);
    } catch (err) {
      console.error(`Error occurred: ${err}`);
    }
  }
}


