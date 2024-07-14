import { Component } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from '../../components/alert/alert.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    AlertComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public login: FormGroup;
  public badCredential: boolean = false;
  constructor(private service: AuthService, private router: Router) {
    this.login = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  sendLogin() {
    this.service
      .login(this.login.value)
      .then((res) => {
        if (res) {
          this.router.navigate(['/']);
        }
      })
      .catch((err) => {
        this.badCredential = true;
      });
  }

  onSubmit() {
    console.warn(this.login.value);
    if (this.login.valid) {
      this.sendLogin();
    }
  }
}
