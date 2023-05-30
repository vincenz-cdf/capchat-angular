import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'capchat.frontend';

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('/api/data');
  }
}
