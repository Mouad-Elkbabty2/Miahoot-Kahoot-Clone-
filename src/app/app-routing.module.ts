import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyMiahootsComponent } from './my-miahoots/my-miahoots.component';

const routes: Routes = [
  { path: 'my-miahoots', component: MyMiahootsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
