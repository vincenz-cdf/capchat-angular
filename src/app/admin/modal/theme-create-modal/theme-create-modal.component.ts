import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-theme-create-modal',
  templateUrl: './theme-create-modal.component.html',
  styleUrls: ['./theme-create-modal.component.scss']
})
export class ThemeCreateModalComponent implements OnInit {

  constructor(private appService: AppServiceService,    private activeModal: NgbActiveModal,) { }

  public themeName: any;

  ngOnInit(): void {

  }

  close(msg: any) {
    this.activeModal.dismiss(msg);
  }

  createTheme() {
    this.appService.createTheme(this.themeName).then((data) => {
      this.activeModal.close(data);
    });

  }
}
