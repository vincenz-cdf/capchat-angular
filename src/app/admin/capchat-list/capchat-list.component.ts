import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-capchat-list',
  templateUrl: './capchat-list.component.html',
  styleUrls: ['./capchat-list.component.scss']
})
export class CapchatListComponent implements OnInit {

  public imageSets: any;
  public user: any;

  constructor(
    private appService: AppServiceService,
    private userService: UserService
    ) { }



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
    this.userService.getCurrentUser().then((data) => {
      this.user = data;
    })
  }

  public crudModal(imageSet?: any) {
    this.appService.openCrudModal(imageSet, this.user).then(() => {
      this.initializeCapchatList();
    });
  }

}
