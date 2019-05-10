import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BankDetailComponent } from './bank-detail/bank-detail.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  }, 
  {
    path: 'bank/:id',
    component: BankDetailComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
