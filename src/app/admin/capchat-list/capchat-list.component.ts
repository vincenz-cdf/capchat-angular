import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-capchat-list',
  templateUrl: './capchat-list.component.html',
  styleUrls: ['./capchat-list.component.scss']
})
export class CapchatListComponent implements OnInit {

  constructor(private appService: AppServiceService) { }

  public imageSets: any;

  ngOnInit(): void {
    this.initializeCapchatList();
  }

  public initializeCapchatList() {
    this.appService.initializeCapchatList().then((data) => {
      this.imageSets = data;
    })
  }

}
