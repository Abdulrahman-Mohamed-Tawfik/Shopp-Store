import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PasswordValidators } from '../../custom-validators/password.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,

  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  constructor(private _authService: AuthService, private _router: Router) { }

  signupForm!: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required,]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, PasswordValidators.passwordStrength()]),
      retypepassword: new FormControl("", [Validators.required]),
      address: new FormControl("", Validators.required),
      phone: new FormControl("", [Validators.required, Validators.pattern(/^\d{11}$/)]),
      gender: new FormControl("", Validators.required)
    }, { validators: PasswordValidators.matchPasswords() }
    );
  }


  signup() {
    console.log(this.signupForm);

    this._authService.signupUser(
      this.signupForm.value.name,
      this.signupForm.value.email,
      this.signupForm.value.password,
      this.signupForm.value.phone,
      this.signupForm.value.gender,
      this.signupForm.value.address
    ).subscribe({
      next: () => {
        console.log("Signup successful");
        this._router.navigate(["login"]);
      },
      error: (err) => {
        // Display the error message to the user
        alert(err.message); // Use an alert, Snackbar, or display it on the form
      }
    });
  }




}
