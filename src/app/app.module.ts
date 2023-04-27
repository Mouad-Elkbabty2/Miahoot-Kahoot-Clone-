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
import { MatSortModule } from '@angular/material/sort';
import { EditMiahootComponent } from './edit-miahoot-component/edit-miahoot-component.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewMiahootComponent } from './new-miahoot/new-miahoot.component';
import { PresentationComponent } from './presentation/presentation.component';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    MyMiahootsComponent,
    EditMiahootComponent,
    NewMiahootComponent,
    PresentationComponent,
    NavbarComponent
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
    FormsModule,
    ReactiveFormsModule, 
    MatListModule,
    CommonModule,
    MatChipsModule,MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
