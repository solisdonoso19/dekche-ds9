import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ButtonComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {}
