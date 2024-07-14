import { ConfigService } from './customRequest.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  constructor(private service: ConfigService) {}
  getCategoriesTypes() {
    return new Promise((resolve, reject) => {
      this.service.get('categories/types').subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(new Error(err.ok));
        }
      );
    });
  }
}
