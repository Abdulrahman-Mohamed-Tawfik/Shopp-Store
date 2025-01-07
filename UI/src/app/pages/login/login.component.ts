import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PasswordValidators } from '../../custom-validators/password.validator';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router) { }
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    });
  }

  login(myForm: FormGroup) {
    this._authService.loginUser(myForm.value.email, myForm.value.password).subscribe({
      next: () => {
        console.log(this._authService.getDecodeToken());
        
        if (this._authService.getDecodeToken().userType == 'admin')
          this._router.navigate(["admin/dashboard"]);
        else
          this._router.navigate(["/home"]);
      },
      error: (err) => {
        console.log(err.message);
      }
    });

    this._authService.getAccessToken().subscribe(
      (token: string | null) => {
        if (token) {
          console.log('Access Token:', token);
        } else {
          console.log('No access token available.');
        }
      },
      (error) => {
        console.error('Error retrieving token:', error);
      }
    );
    
    

  }

  logout() { }
}
