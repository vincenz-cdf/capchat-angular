import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CapchatComponent } from './capchat/capchat.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './auth/register/register.component';
import { CommonModule } from '@angular/common';
import { CapchatListComponent } from './admin/capchat-list/capchat-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CapchatComponent,
    LoginComponent,
    RegisterComponent,
    CapchatListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
