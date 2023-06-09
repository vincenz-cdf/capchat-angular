import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username: any;
  public password: any;

  constructor(private appService: AppServiceService) { }

  ngOnInit(): void {

  }

  signIn() {
    const credentials = {
      username: this.username,
      password: this.password
    }
    console.log(credentials);
    this.appService.signIn(credentials).then(data => {
      if (data.auth) {
        alert('Signin successful');
        window.location.href = '/capchat';
      } else {
        alert('Signin failed: ' + data.message);
      }
    })
      .catch(error => console.error('Error:', error));
  }

}
