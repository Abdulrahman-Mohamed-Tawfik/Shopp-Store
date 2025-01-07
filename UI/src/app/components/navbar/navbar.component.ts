import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn = true;
  isAdmin = false;
  user: any;
  constructor(private _authS: AuthService, private _router: Router) { }
  ngOnInit(): void {
    this._authS.getAccessToken().subscribe(data => {
      if (data) {
        this.isLoggedIn = true;
        this.user = this._authS.getDecodeToken();
        // console.log('user decoded: ',this.user);
        
        if (this.user.userType === 'admin') {
          this.isAdmin = true;
        }
      }
      else
        this.isLoggedIn = false;
    })
  }


  logout() {
    this._authS.logoutUser();
  }
}
