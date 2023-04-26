import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil-component/accueil-component.component';
import { EditMiahootComponent } from './edit-miahoot-component/edit-miahoot-component.component';
import { MyMiahootsComponent } from './my-miahoots/my-miahoots.component';
import { NewMiahootComponent } from './new-miahoot/new-miahoot.component';
import { FormsModule } from '@angular/forms';
import { PresentationComponent } from './presentation/presentation.component';



const routes: Routes = [
  {path: '',title: 'Accueil', component: AccueilComponent,},
  { path: 'my-miahoots', component: MyMiahootsComponent },
  { path: 'new-miahoot', component: NewMiahootComponent },
  { path: 'edit-miahoot', component: EditMiahootComponent },
  { path: 'presentation/:id', component: PresentationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
