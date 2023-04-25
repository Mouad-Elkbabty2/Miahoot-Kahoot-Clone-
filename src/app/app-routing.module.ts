import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil-component/accueil-component.component';
import { EditMiahootComponent } from './edit-miahoot-component/edit-miahoot-component.component';
import { MyMiahootsComponent } from './my-miahoots/my-miahoots.component';
const routes: Routes = [
  {path: '',title: 'Accueil', component: AccueilComponent,},
  { path: 'my-miahoots', component: MyMiahootsComponent },
  { path: 'edit-miahoot', component: EditMiahootComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
