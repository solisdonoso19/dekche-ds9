import { Component } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public search: FormGroup;
  constructor(private router: Router) {
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

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
