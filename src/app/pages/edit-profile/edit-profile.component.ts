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
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../../components/alert/alert.component';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
    AlertComponent,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  public profile: FormGroup;
  public editPass: boolean = true;
  public user: any;
  public badRequest: boolean = false;

  constructor(private service: UserService, private router: Router) {
    this.profile = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      // password: new FormControl({ value: '', disabled: this.editPass }, [
      //   Validators.minLength(6),
      // ]),
      // rePassword: new FormControl({ value: '', disabled: this.editPass }, [
      //   Validators.minLength(6),
      // ]),
      // newPassword: new FormControl({ value: '', disabled: this.editPass }, [
      //   Validators.minLength(6),
      // ]),
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
      image: new FormControl(''),
      province: new FormControl('', [
        Validators.minLength(4),
        Validators.required,
      ]),
      phone_number: new FormControl('', [
        Validators.minLength(8),
        Validators.required,
      ]),
      bio: new FormControl('', [Validators.minLength(25), Validators.required]),
    });
  }

  ngOnInit() {
    this.service
      .getProfile()
      .then((res) => {
        this.user = res;
        this.profile.setValue({
          names: this.user.names,
          email: this.user.email,
          username: this.user.username,
          lastnames: this.user.lastnames,
          province: this.user.province,
          phone_number: this.user.phone_number,
          bio: this.user.bio,
          image: this.user.image,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // changePass() {
  //   this.editPass = !this.editPass;
  //   if (!this.editPass) {
  //     this.profile.get('password')?.enable();
  //     this.profile.get('newPassword')?.enable();
  //     this.profile.get('rePassword')?.enable();
  //   } else {
  //     this.profile.get('password')?.disable();
  //     this.profile.get('newPassword')?.disable();
  //     this.profile.get('rePassword')?.disable();
  //   }
  // }

  editProfile() {
    this.service
      .putProfile(this.profile.value)
      .then((res) => {
        if (res) {
          this.router.navigate(['/profile']);
        }
      })
      .catch((err) => {
        this.badRequest = true;
      });
  }

  onSubmit() {
    console.warn(this.profile.value);
    if (this.profile.valid) {
      this.editProfile();
    }
  }
}
