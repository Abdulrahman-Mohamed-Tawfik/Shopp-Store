import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsertypesService } from '../../../services/usertypes.service';

@Component({
  selector: 'app-add-usertype',
  standalone: false,

  templateUrl: './add-usertype.component.html',
  styleUrl: './add-usertype.component.css'
})
export class AddUsertypeComponent {
  userTypeForm: FormGroup;
  constructor(private _userTypeS: UsertypesService) {
    this.userTypeForm = new FormGroup({ 
      typeName: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
     })
  }
  adduserType() {
    console.log(this.userTypeForm.value);
    this._userTypeS.createUserType(this.userTypeForm.value).subscribe({
      next: (response) => {
        console.log('UserType created successfully:', response);
        this.userTypeForm.reset();
      },
      error: (err) => {
        console.error('Error creating UserType:', err);
        alert(err.message);
      },
    });
  }
}
