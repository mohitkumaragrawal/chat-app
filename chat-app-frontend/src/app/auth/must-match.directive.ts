import { Directive, Input } from '@angular/core';
import {
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  FormGroup,
  FormControl,
} from '@angular/forms';

function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName] as FormControl;
    const matchingControl = formGroup.controls[
      matchingControlName
    ] as FormControl;

    // return null if controls haven't initialised yet
    if (!control || !matchingControl) {
      return null;
    }

    // return null if another validator has already found an error on the matchingControl
    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return null;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }

    return matchingControl.errors;
  };
}

@Directive({
  selector: '[appMustMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MustMatchDirective,
      multi: true,
    },
  ],
})
export class MustMatchDirective implements Validator {
  @Input('appMustMatch') appMustMatch: string[] = [];

  validate(control: FormGroup): ValidationErrors | null {
    return MustMatch(this.appMustMatch[0], this.appMustMatch[1])(control);
  }
}
