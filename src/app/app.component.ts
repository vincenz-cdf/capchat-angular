import { Component } from '@angular/core';
import { AppServiceService } from './services/app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'capchat.frontend';

  constructor(private service: AppServiceService) {

  }

  ngOnInit() {
    //Rien faire
  }

  getData() {
    this.service.getData().then(data => {
      console.log(data)
    }).catch(error => {
      console.error(error);
    });
  }



}
