import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppServiceService } from 'src/app/services/app-service.service';
import * as JSZip from 'jszip';
import Swal from 'sweetalert2';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-capchat-create-modal',
  templateUrl: './capchat-create-modal.component.html',
  styleUrls: ['./capchat-create-modal.component.scss']
})
export class CapchatCreateModalComponent implements OnInit {

  @Input() public params: any;

  closeResult = '';
  themes: any;
  uploadedImages: { url: string, name: string, hint?: string, id?: any }[] = [];

  public creation = false;
  public imageSetData: any;

  private api = "http://localhost:3000";

  @ViewChild('imagePreviewModal') imagePreviewModal: any;  // Reference to the image preview modal

  constructor(
    private modalService: NgbModal,
    private appService: AppServiceService,
    private activeModal: NgbActiveModal,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {

    if(this.params.filter == 'category') {
      this.getImagesFromThemeId();
      this.manageImages();
    } else {
      if (!this.params.imageSet) {
        this.creation = true;
      }
  
      this.imageSetData = {
        "name": this.creation ? '' : this.params.imageSet.name,
        "theme": this.creation ? 1 : this.params.imageSet.theme_id,
        "destination_url": this.creation ? '' : this.params.imageSet.destination_url,
      }
      this.getThemes();
  
      if (!this.creation) {
        this.getImagesFromImagesSet();
      }
    }

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

  async getImagesAsJson() {
    const formData = new FormData();
    for (let index = 0; index < this.uploadedImages.length; index++) {
      const image = this.uploadedImages[index];
      let url: any = image.url;
      if (!this.creation) {
        url = await this.imageService.fetchImageAsBase64(image.url);
      }
      const byteCharacters = atob(url.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/jpeg' });

      formData.append(`file${index}`, blob, image.name);
      formData.append(`imageId${index}`, image.id);
      formData.append(`hint${index}`, image.hint ? image.hint : "");
    }
    formData.append('set_name', this.imageSetData.name);
    formData.append('theme_id', this.imageSetData.theme);
    formData.append('user_id', this.params.user.id);
    formData.append('image_sets_id', this.params.imageSet ? this.params.imageSet.id : null);
    formData.append('destination_url', this.imageSetData.destination_url);
    this.appService.sendImagesToServer(formData).then(response => {
      this.activeModal.close()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: "Jeu d'images enregistré",
        showConfirmButton: false,
        backdrop: false,
        timer: 1500
      });
    });
  }


  manageImages() {
    setTimeout(() => {
      this.modalService.open(this.imagePreviewModal, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
    }, 500);
  }

  getImagesFromImagesSet() {
    this.appService.getImagesFromServer(this.params.imageSet.id).then((data) => {

      data.forEach((d: any) => {
        this.uploadedImages.push({ url: this.api + d.path, name: d.path.split('/').pop(), hint: d.hint, id: d.id });
      });
    });
  }

  getImagesFromThemeId() {
    console.log(this.params.imageSet.theme_id)
    this.appService.getImagesFromServerByTheme(this.params.imageSet.theme_id).then((data) => {

      data.forEach((d: any) => {
        this.uploadedImages.push({ url: this.api + d.path, name: d.path.split('/').pop(), hint: d.hint, id: d.id });
      });
    });
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
    if(this.params.filter == 'category') {
      this.activeModal.close('filter');
    }
    
  }

  public themeModal() {
    this.appService.openThemeModal().then((data) => {
      this.getThemes();
      this.imageSetData.theme = data.themeId;
    });
  }

}
