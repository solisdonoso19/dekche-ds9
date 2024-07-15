import { Injectable } from '@angular/core';
import { ConfigService } from './customRequest.service';

@Injectable({ providedIn: 'root' })
export class ArticlesService {
  public userId: number = 0;

  constructor(private service: ConfigService) {
    if (sessionStorage.getItem('user')) {
      const user: any = JSON.parse(sessionStorage.getItem('user') || '');
      this.userId = user.id;
    }
  }

  getPost() {
    return new Promise((resolve, reject) => {
      this.service.get(`posts/`).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(new Error(err.ok));
        }
      );
    });
  }

  getPostByCategory(id: string) {
    return new Promise((resolve, reject) => {
      this.service.get(`posts/category/${id}`).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(new Error(err.ok));
        }
      );
    });
  }

  getPostByType(id: string) {
    return new Promise((resolve, reject) => {
      this.service.get(`posts/type/${id}`).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(new Error(err.ok));
        }
      );
    });
  }

  getPostById(id: string) {
    return new Promise((resolve, reject) => {
      this.service.get(`posts/${id}`).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(new Error(err.ok));
        }
      );
    });
  }
  addToCart(data: any) {
    const body: any = { ...data, userId: this.userId };
    return new Promise((resolve, reject) => {
      this.service.post('shoppingCart', body).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(new Error(err.ok));
        }
      );
    });
  }
  postArticle(data: any) {
    const body = { ...data, userId: this.userId };
    return new Promise((resolve, reject) => {
      this.service.post('posts', body).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(new Error(err.ok));
        }
      );
    });
  }

  getCart() {
    return new Promise((resolve, reject) => {
      this.service.get(`shoppingCart/${this.userId}`).subscribe(
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
