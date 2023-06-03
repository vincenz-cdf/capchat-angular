import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CapchatComponent } from './capchat/capchat.component';
import { LoginComponent } from './auth/login/login.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'capchat', component: CapchatComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
