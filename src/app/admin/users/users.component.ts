import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

interface User {
  id?: number;
  username: string;
  email: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  page = 1;
  pageSize = 5;
  collectionSize: any;
  users: User[];
  paginatedUsers: User[];

  constructor(
    private appService: AppServiceService,
    private userService: UserService
  ) {
  }
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.userService.getCurrentUser().then((user) => {
      this.userService.getUsers(user.id).then((data) => {
        this.users = data;
        this.collectionSize = data.length;
        this.refreshUsers();
      })
    });

  }

  refreshUsers() {
    this.paginatedUsers = this.users.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  }

  openUserModal(user: any) {
    this.userService.openUserModal(user).then(() => {
      this.loadData();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: "Modifications enregistrées",
        showConfirmButton: false,
        backdrop: false,
        timer: 1500
      });
    });
  }

}
