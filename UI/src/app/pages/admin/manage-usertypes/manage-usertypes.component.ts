import { Component, OnInit, ViewChild } from '@angular/core';
import { UsertypesService } from '../../../services/usertypes.service';
import { ConfirmationModalComponent } from '../../../components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-manage-usertypes',
  standalone: false,

  templateUrl: './manage-usertypes.component.html',
  styleUrl: './manage-usertypes.component.css'
})
export class ManageUsertypesComponent implements OnInit {
  constructor(private _userTypeS: UsertypesService) { }
  userTypes: any;
  userIdtoDelete: any = null;
  @ViewChild(ConfirmationModalComponent) confirmationModal!: ConfirmationModalComponent;

  ngOnInit(): void {
    this.fetchUserTypes();
  }

  fetchUserTypes(): void {
    this._userTypeS.getUserTypes().subscribe({
      next: (userTypes) => {
        this.userTypes = userTypes;
      },
      error: (err) => {
        console.error('Error fetching User Types:', err);
      }
    });
  }

  deleteUserType(id: any): void {
    console.log("Deleting UserType with id:", id);
    this.userIdtoDelete = id;

    if (this.confirmationModal) {
      this.confirmationModal.showModal();
    }
  }

  deleteUserTypeWithConfirmation(): void {
    if (this.userIdtoDelete) {
      console.log("id del: ",this.userIdtoDelete);
      
      this._userTypeS.deleteUserType(this.userIdtoDelete).subscribe({
        next: (response) => {
          this.fetchUserTypes();
        },
        error: (err) => {
          console.error('Error deleting UserType:', err);
          alert('Error deleting UserType');
        }
      });
    }
  }

  cancelDeletion(): void {
    console.log('Deletion cancelled');
  }

  edit(UserType: any): void {
    console.log('Editing UserType:', UserType);
  }
}
