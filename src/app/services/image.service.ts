import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  fetchImageAsBase64(url: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          resolve(base64data);
        };
        reader.onerror = (err) => {
          reject(err);
        };
        reader.readAsDataURL(blob);
      }, reject);
    });
  }
  
}
