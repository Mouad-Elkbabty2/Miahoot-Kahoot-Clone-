import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil-component/accueil-component.component';
import { MyMiahootsComponent } from './my-miahoots/my-miahoots.component';
import { NewMiahootComponent } from './new-miahoot/new-miahoot.component';
import { FormsModule } from '@angular/forms';
import { ParticipantComponent } from './participant/participant.component';
import { AuthComponent } from './auth/auth.component';
import { TestApiComponent } from './test-api/test-api.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  {path: '',title: 'Accueil', component: AccueilComponent,},
  { path: 'my-miahoots', component: MyMiahootsComponent, canActivate: [AuthGuard]},
  { path: 'new-miahoot/:id', component: NewMiahootComponent, canActivate: [AuthGuard]  }, //canActivate interdit l'accés à certains utilisateur
  { path: 'testApi', component:TestApiComponent},
  { path: 'participant/:id', component: ParticipantComponent },
  { path: 'test', component:AuthComponent},
  { path: 'login', component:LoginComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
