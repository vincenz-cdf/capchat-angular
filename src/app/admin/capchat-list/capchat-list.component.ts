import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-capchat-list',
  templateUrl: './capchat-list.component.html',
  styleUrls: ['./capchat-list.component.scss']
})
export class CapchatListComponent implements OnInit {

  public imageSets: any;
  public user: any;

  constructor(private appService: AppServiceService) { }



  ngOnInit(): void {
    this.getCurrentUser();
    this.initializeCapchatList();
  }

  public initializeCapchatList() {
    this.appService.initializeCapchatList().then((data) => {
      this.imageSets = data;
    })
  }

  public getCurrentUser() {
    this.appService.getCurrentUser().then((data) => {
      this.user = data;
    })
  }

  public crudModal(imageSet?: any) {
    this.appService.openCrudModal(imageSet, this.user);
  }
}
