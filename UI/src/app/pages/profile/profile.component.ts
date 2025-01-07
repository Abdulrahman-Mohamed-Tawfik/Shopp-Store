import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: false,

  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: any;
  constructor(private _authS: AuthService) { }

  ngOnInit(): void {
    this._authS.getAccessToken().subscribe(data => {
      if (data) {
        this.user = this._authS.getDecodeToken();
      }
    });
    // console.log(this.user.value);
    
  }

  logout() {
    this._authS.logoutUser();
  }

}
