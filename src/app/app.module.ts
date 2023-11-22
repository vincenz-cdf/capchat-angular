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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CapchatCreateModalComponent } from './admin/modal/capchat-create-modal/capchat-create-modal.component';
import { CookieService } from 'ngx-cookie-service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { ThemeCreateModalComponent } from './admin/modal/theme-create-modal/theme-create-modal.component';
import { UsersComponent } from './admin/users/users.component';
import { HeaderComponent } from './admin/header/header.component';
import { UserComponent } from './admin/modal/user/user.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    CapchatComponent,
    LoginComponent,
    RegisterComponent,
    CapchatListComponent,
    CapchatCreateModalComponent,
    ThemeCreateModalComponent,
    UsersComponent,
    HeaderComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    NgbModule,
  ],
  providers: [
    CookieService,
    {
      provide: JWT_OPTIONS,
      useValue: {
        tokenGetter: tokenGetter,
        allowedDomains: ["https://node-capchat-production.up.railway.app"],
        disallowedRoutes: ["http://example.com/api/auth"],
      }
    },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
