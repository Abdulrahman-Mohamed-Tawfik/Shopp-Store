import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class PasswordValidators {
    static passwordStrength(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value) { return null; }

            const hasNumber = /[0-9]/.test(value);
            const hasUpperCase = /[A-Z]/.test(value);
            const hasLowerCase = /[a-z]/.test(value);
            const isValidlength = value.length >= 6;
            const passwordValid = hasNumber && hasUpperCase && hasLowerCase && isValidlength;
            return !passwordValid ? { passwordStrength: true } : null;

        }
    }
    static matchPasswords(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const password = control.get('password');
            const retypePassword = control.get('retypepassword');

            if (password?.value && retypePassword?.value && password.value !== retypePassword.value) {                
                return { passwordMatchError: true };
            }
            return null;
        };
    }


}
