import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppServiceService } from 'src/app/services/app-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() params: any;

  constructor(
    private activeModal: NgbActiveModal,
    private userService: UserService
    ) { }
  public id: any;
  public username: any;
  public email: any;

  ngOnInit(): void {
      this.id = this.params.user.id;
      this.username = this.params.user.username;
      this.email = this.params.user.email;
  }

  close(msg: any) {
    this.activeModal.dismiss(msg);
  }

  updateUser() {
    const data = {
      "username": this.username,
      "email": this.email,
    }
    this.userService.updateUser(this.id, data).then((data) => {
      this.activeModal.close();
    });

  }

}
