import { Component } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  public profile: FormGroup;
  public editPass: boolean = true;
  constructor() {
    this.profile = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl({ value: '', disabled: this.editPass }, [
        Validators.minLength(6),
      ]),
      rePassword: new FormControl({ value: '', disabled: this.editPass }, [
        Validators.minLength(6),
      ]),
      newPassword: new FormControl({ value: '', disabled: this.editPass }, [
        Validators.minLength(6),
      ]),
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
      image: new FormControl('', [Validators.required]),
      province: new FormControl('', [
        Validators.minLength(4),
        Validators.required,
      ]),
      phoneNumber: new FormControl('', [
        Validators.minLength(8),
        Validators.required,
      ]),
      bio: new FormControl('', [Validators.minLength(25), Validators.required]),
    });
  }

  changePass() {
    this.editPass = !this.editPass;
    if (!this.editPass) {
      this.profile.get('password')?.enable();
      this.profile.get('newPassword')?.enable();
      this.profile.get('rePassword')?.enable();
    } else {
      this.profile.get('password')?.disable();
      this.profile.get('newPassword')?.disable();
      this.profile.get('rePassword')?.disable();
    }
  }

  onSubmit() {
    console.warn(this.profile.value);
    if (this.profile.valid) {
      console.log(this.profile.value);
    }
  }
}
