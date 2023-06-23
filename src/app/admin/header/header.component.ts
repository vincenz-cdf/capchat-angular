import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  private user: any;

  openCurrentUserCrud() {
    this.userService.getCurrentUser().then((user) => {
      this.userService.openUserModal(user).then(() => {
        this.userService.logout().then(() => {
          this.router.navigate(['/login']);
        })
      });
    });

  }
}
