import { Component } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticlesService } from '../../services/articles.services';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [InputComponent, ButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public search: FormGroup;
  public cart: any[] = [];
  public total: number = 0;
  constructor(private router: Router, private service: ArticlesService) {
    this.search = new FormGroup({
      search: new FormControl(''),
    });
  }

  ngOnInit() {
    if (!sessionStorage.getItem('auth')) {
      this.router.navigate(['/login']);
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  goToSell() {
    this.router.navigate(['/sell']);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  getCart() {
    this.service
      .getCart()
      .then((res: any) => {
        this.cart = res.items;
        this.total = 0;
        this.cart.forEach((c) => {
          this.total = this.total + c.price;
        });
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
