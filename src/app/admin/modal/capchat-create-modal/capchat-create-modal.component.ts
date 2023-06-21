import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppServiceService } from 'src/app/services/app-service.service';
import * as JSZip from 'jszip';

@Component({
  selector: 'app-capchat-create-modal',
  templateUrl: './capchat-create-modal.component.html',
  styleUrls: ['./capchat-create-modal.component.scss']
})
export class CapchatCreateModalComponent implements OnInit {

  @Input() public params: any;

  closeResult = '';
  themes: any;
  uploadedImages: { url: string, name: string, hint?: string }[] = [];

  public creation = false;
  public imageSetData: any;

  @ViewChild('imagePreviewModal') imagePreviewModal: any;  // Reference to the image preview modal

  constructor(
    private modalService: NgbModal,
    private appService: AppServiceService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    if (!this.params.imageSet) {
      this.creation = true;
    }

    this.imageSetData = {
      "name": this.creation ? '' : this.params.imageSet.name,
      "theme": this.creation ? null : this.params.imageSet.theme_id,
    }
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

  close(msg: any) {
    this.activeModal.dismiss(msg);
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
        for (let i = 0; i < fileInput.files!.length; i++) {
          if (fileInput.files![i].name.endsWith('.zip')) {
            JSZip.loadAsync(fileInput.files![i]).then((zip) => {
              zip.forEach((relativePath, zipEntry) => {
                if (zipEntry.name.endsWith('.png') || zipEntry.name.endsWith('.jpg') || zipEntry.name.endsWith('.jpeg')) {
                  zipEntry.async('base64').then((fileData) => {
                    this.uploadedImages.push({ url: 'data:image/png;base64,' + fileData, name: zipEntry.name, hint: '' });
                  });
                }
              });
            });
          } else {
            let reader = new FileReader();
            reader.onload = (e: any) => {
              this.uploadedImages.push({ url: e.target.result, name: fileInput.files![i].name, hint: '' });
            }
            reader.readAsDataURL(fileInput.files![i]);
          }
        }
        setTimeout(() => {
          this.modalService.open(this.imagePreviewModal, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
        }, 500);
      }
    } else {
      console.log("error")
    }
  }

  removeImage(i: any) {
    this.uploadedImages.splice(i, 1)
  }

  getImagesAsJson() {
    const formData = new FormData();
    this.uploadedImages.forEach((image, index) => {
      const byteCharacters = atob(image.url.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
      formData.append(`file${index}`, blob, image.name);
      formData.append(`hint${index}`, image.hint ? image.hint : "");
    });
    formData.append('set_name', this.imageSetData.name);
    formData.append('theme_id', this.imageSetData.theme);
    formData.append('user_id', this.params.user.id);
    this.appService.sendImagesToServer(formData).then(response => {
      this.activeModal.close()
    });
  }

  manageImages(creation: boolean) {
    if(!creation) { //Modification
      
    }
  }

  disableUploadImageButton() {

    for (let i in this.uploadedImages) {
      if (this.uploadedImages[i].hint) {
        return false;
      }
    }
    return true;
  }

  cancelUploadedImages(modal: any) {
    this.uploadedImages = [];
    modal.close();
  }

}
