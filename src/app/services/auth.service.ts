import { Router } from '@angular/router';
import { ConfigService } from './customRequest.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private service: ConfigService) {}
  login(credentials: any) {
    return new Promise((resolve, reject) => {
      this.service.post('auth/login', credentials).subscribe(
        (res) => {
          if (res.auth) {
            sessionStorage.setItem('token', res.token);
            sessionStorage.setItem('auth', res.auth);
            sessionStorage.setItem('user', JSON.stringify(res.user));
            resolve(true);
          }
        },
        (err) => {
          reject(new Error(err.ok));
        }
      );
    });
  }

  register(credentials: any) {
    return new Promise((resolve, reject) => {
      this.service.post('auth/register', credentials).subscribe(
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
