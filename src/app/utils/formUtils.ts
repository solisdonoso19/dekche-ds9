import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: any } | null => {
    const formGroupInstance = formGroup as FormGroup;
    const control = formGroupInstance.controls[controlName];
    const matchingControl = formGroupInstance.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return null;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }

    return null;
  };
}
