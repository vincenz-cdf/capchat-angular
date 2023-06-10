import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-capchat-create-modal',
  templateUrl: './capchat-create-modal.component.html',
  styleUrls: ['./capchat-create-modal.component.scss']
})
export class CapchatCreateModalComponent implements OnInit {

  closeResult = '';
  themes: any;
  uploadedImages: any[] = [];  // To store the uploaded images

  @ViewChild('imagePreviewModal') imagePreviewModal: any;  // Reference to the image preview modal

  constructor(
    private modalService: NgbModal,
    private appService: AppServiceService,
    private config: NgbModalConfig
  ) {
		config.backdrop = 'static';
		config.keyboard = false;
  }

  ngOnInit(): void {
    this.getThemes();

  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = "Jeux d'images crée!";
      },
      (reason) => {
        this.closeResult = "Annulation création";
      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getThemes() {
    this.appService.initializeThemes().then((data) => {
      this.themes = data;
    })
  }


  downloadImages() {
    let fileInput = <HTMLInputElement>document.getElementById('uploadBloc');
    fileInput.click();

    if (fileInput != null) {
      fileInput.onchange = (event) => {
        // Assuming you want to display image previews
        for (let i = 0; i < fileInput.files!.length; i++) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            this.uploadedImages.push(e.target.result);  // Add the image to the uploadedImages array
          }
          reader.readAsDataURL(fileInput.files![i]);  // Read the image file as a data URL
        }

        // Open the image preview modal after a delay to allow image loading
        setTimeout(() => {
          this.modalService.open(this.imagePreviewModal, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
        }, 500);
      }
    } else {
      console.log("error")
    }
  }

}
