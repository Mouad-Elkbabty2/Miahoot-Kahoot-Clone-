import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil-component/accueil-component.component';
import { MyMiahootsComponent } from './my-miahoots/my-miahoots.component';
const routes: Routes = [
  {
    path: '',
    title: 'Accueil',
    component: AccueilComponent,
  },
  { path: 'my-miahoots', component: MyMiahootsComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
