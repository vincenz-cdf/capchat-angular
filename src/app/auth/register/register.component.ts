import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public username: any;
  public password: any;

  constructor(private appService: AppServiceService) { }

  ngOnInit(): void {
  }

  signUp() {
    const credentials = {
      username: this.username,
      password: this.password
    }
    this.appService.signUp(credentials)
      .then(data => {
        if (data.success) {
          alert('Signup successful');
          window.location.href = '/login'; // Redirect to another page
        } else {
          alert('Signup failed: ' + data.message);
        }
      })
      .catch(error => console.error('Error:', error));
  }

}
