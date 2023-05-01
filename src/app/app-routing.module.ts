import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil-component/accueil-component.component';
import { EditMiahootComponent } from './edit-miahoot-component/edit-miahoot-component.component';
import { MyMiahootsComponent } from './my-miahoots/my-miahoots.component';
import { NewMiahootComponent } from './new-miahoot/new-miahoot.component';
import { FormsModule } from '@angular/forms';
import { PresentationComponent } from './presentation/presentation.component';
import { AuthComponent } from './auth/auth.component';
import { TestApiComponent } from './test-api/test-api.component';



const routes: Routes = [
  {path: '',title: 'Accueil', component: AccueilComponent,},
  { path: 'my-miahoots', component: MyMiahootsComponent },
  { path: 'new-miahoot/:id', component: NewMiahootComponent },
  { path: 'edit-miahoot', component: EditMiahootComponent },
  { path: 'presentation/:id', component: PresentationComponent },
  { path: 'test', component:AuthComponent},
  { path: 'testApi', component:TestApiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
