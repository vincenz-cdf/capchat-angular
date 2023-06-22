import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../services/app-service.service';
import { ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-capchat',
  templateUrl: './capchat.component.html',
  styleUrls: ['./capchat.component.scss']
})
export class CapchatComponent implements OnInit {
  hint = '';
  images: any;
  timeLeft = 30;
  duration = 30;
  downloadTimer: any;
  selectedImageId: any = null;
  imageSetId: any;

  constructor(
    private appService : AppServiceService,
    private route: ActivatedRoute 
    ) {}

  ngOnInit() {
    this.startTimer(this.timeLeft);
    this.imageSetId = this.route.snapshot.paramMap.get('id');
    this.loadData();
  }

  imageClickHandler(image: any) {
    this.images.forEach((img: any) => img.selected = false);
    image.selected = true; // Set the selected property of the clicked image
    this.selectedImageId = image.id;
  }
  

  confirmHandler() {
    this.appService.checkSelectedCapchat({id: this.selectedImageId, image_sets_id: this.imageSetId}).then((data: any) => {
      if (data.singular === false) {
        this.resetTimerAndImages();
      } else if (data.singular == true) {
        window.location.href = data.url;
      }
    }, error => console.error('Error:', error));
  }

  startTimer(duration: any) {
    clearInterval(this.downloadTimer);
    this.timeLeft = this.duration;
    this.downloadTimer = setInterval(() => {
      if(this.timeLeft <= 0) {
        clearInterval(this.downloadTimer);
        this.resetTimerAndImages();
      }
      this.timeLeft--;
    }, 1000);
  }


  resetTimerAndImages() {
    this.appService.reInitializeCapchat({"id": this.imageSetId}).then((result: any) => {
      this.images = result.images;
      this.hint = result.hint;
      if (this.duration > 5) {
        this.duration -= 5;
        this.startTimer(this.timeLeft);
      } else {
        alert("No Human");
        location.reload();
      }
    }, error => console.error('Error:', error));
  }

  loadData() {
    this.appService.initializeCapchat(this.imageSetId).then((data) => {
      this.hint = data.hint;
      this.images = data.images;
    }).catch(error => {
      console.error(error);
    });
  }

  getProgressBarWidth() {
    return (this.timeLeft * 100) / this.duration;
  }
}
