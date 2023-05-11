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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewMiahootComponent } from './new-miahoot/new-miahoot.component';
import { ParticipantComponent } from './participant/participant.component';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { AuthComponent } from './auth/auth.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { NavbarComponent } from './navbar/navbar.component';
import { MiahootService } from './services/miahoot.service';
import { HttpClientModule } from '@angular/common/http';
import { TestApiComponent } from './test-api/test-api.component';
import { PresentateurComponent } from './presentateur/presentateur.component';
import { LoggedComponent } from './logged/logged.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { CreateMihaootComponent } from './create-mihaoot/create-mihaoot.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    MyMiahootsComponent,
    NewMiahootComponent,
    ParticipantComponent,
    AuthComponent,
    NavbarComponent,
    TestApiComponent,
    PresentateurComponent,
    LoggedComponent,
    LoginComponent,
    CreateMihaootComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
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
    MatChipsModule,
    MatCardModule,
    HttpClientModule,
    NgxQRCodeModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
  ],
  providers: [MiahootService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
