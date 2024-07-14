import { Component } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MustMatch } from '../../utils/formUtils';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../../components/alert/alert.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    AlertComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public register: FormGroup;
  public badCredential: boolean = false;
  constructor(private service: AuthService, private router: Router) {
    this.register = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.minLength(6)]),
        rePassword: new FormControl('', [Validators.minLength(6)]),
        username: new FormControl('', [
          Validators.minLength(5),
          Validators.required,
        ]),
        names: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        lastnames: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        province: new FormControl('', [
          Validators.minLength(4),
          Validators.required,
        ]),
        phone_number: new FormControl('', [
          Validators.minLength(8),
          Validators.required,
        ]),
        bio: new FormControl('', [
          Validators.minLength(25),
          Validators.required,
        ]),
      },
      { validators: MustMatch('password', 'rePassword') }
    );
  }

  sendRegister() {
    this.service
      .register(this.register.value)
      .then((res) => {
        if (res) {
          this.router.navigate(['/login']);
        }
      })
      .catch((err) => {
        this.badCredential = true;
      });
  }

  onSubmit() {
    console.warn(this.register);
    if (this.register.valid) {
      this.sendRegister();
    }
  }
}
