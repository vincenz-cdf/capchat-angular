import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username: any;
  public password: any;

  constructor(
    private appService: AppServiceService,
    private router: Router

    ) { }

  ngOnInit(): void {

  }

  signIn() {
    const credentials = {
      username: this.username,
      password: this.password
    }
    this.appService.signIn(credentials)
      .then(data => {
        if (data.auth) {
          // Save token in Local Storage
          localStorage.setItem('authToken', data.token);
          alert('Signin successful');
          this.router.navigate(['']);
        } else {
          alert('Signin failed: ' + data.message);
        }
      })
      .catch(error => console.error('Error:', error));
  }
  

}
