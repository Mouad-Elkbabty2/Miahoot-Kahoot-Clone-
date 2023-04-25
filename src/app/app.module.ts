import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyMiahootsComponent } from './my-miahoots/my-miahoots.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { AccueilComponent } from './accueil-component/accueil-component.component';
<<<<<<< HEAD
import { MatSortModule } from '@angular/material/sort'
import { NewMiahootComponent } from './new-miahoot/new-miahoot.component';
import { FormsModule } from '@angular/forms';

=======
import { MatSortModule } from '@angular/material/sort';
import { EditMiahootComponent } from './edit-miahoot-component/edit-miahoot-component.component'
import { FormsModule } from '@angular/forms'; 
>>>>>>> 15e8db8a0543c59ffc300bb84ca445073005d134


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    MyMiahootsComponent,
<<<<<<< HEAD
    NewMiahootComponent
=======
    EditMiahootComponent
>>>>>>> 15e8db8a0543c59ffc300bb84ca445073005d134
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
