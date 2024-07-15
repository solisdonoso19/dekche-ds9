import { Router } from '@angular/router';
import { ConfigService } from './customRequest.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  public userId: number = 0;

  constructor(private service: ConfigService) {
    if (sessionStorage.getItem('user')) {
      const user: any = JSON.parse(sessionStorage.getItem('user') || '');
      this.userId = user.id;
    }
  }
  getProfile() {
    return new Promise((resolve, reject) => {
      this.service.get(`users/${this.userId}`).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(new Error(err.ok));
        }
      );
    });
  }

  putProfile(values: any) {
    return new Promise((resolve, reject) => {
      this.service.put(`users/${this.userId}`, values).subscribe(
        (res) => {
          if (res.success) {
            resolve(true);
          }
        },
        (err) => {
          reject(new Error(err.ok));
        }
      );
    });
  }
}
