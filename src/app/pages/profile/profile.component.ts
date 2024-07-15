import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ButtonComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  public user: any;
  constructor(private service: UserService, private router: Router) {}

  ngOnInit() {
    this.service
      .getProfile()
      .then((res) => {
        this.user = res;
        console.log(this.user);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  editProfile() {
    this.router.navigate(['/edit-profile']);
  }
}
