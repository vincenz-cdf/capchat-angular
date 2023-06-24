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
  public regroupSetting: any = 'name';

  constructor(
    private appService: AppServiceService,
    private userService: UserService
    ) { }



  ngOnInit(): void {
    this.regroupSetting = 'name';
    this.getCurrentUser();
    this.initializeCapchatList('name');
  }

  public initializeCapchatList(filter: any) {
    this.appService.initializeCapchatList(filter).then((data) => {
      this.imageSets = data;
    })
  }

  public getCurrentUser() {
    this.userService.getCurrentUser().then((data) => {
      this.user = data;
    })
  }

  public crudModal(imageSet?: any) {
    this.appService.openCrudModal(imageSet, this.user, this.regroupSetting).then((reason) => {
      if(reason != 'filter') {
        this.initializeCapchatList(this.regroupSetting);
      }
      
    });
  }

  public changeRegroupSetting(filter: any) {
    this.regroupSetting = filter;
    this.initializeCapchatList(filter);
  }

}
