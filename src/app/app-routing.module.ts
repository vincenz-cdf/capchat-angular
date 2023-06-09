import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CapchatComponent } from './capchat/capchat.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';


const routes: Routes = [
  { path: '',
  children: [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
  ] },
  { path: 'register', component: RegisterComponent },
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
