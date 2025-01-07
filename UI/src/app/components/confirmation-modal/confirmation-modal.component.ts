import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  standalone: false,
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  @Output() onConfirmDeletion = new EventEmitter<void>();
  @Output() onCancelDeletion = new EventEmitter<void>();

  isModalVisible = false;

  // Call this method to show the modal
  showModal(): void {
    this.isModalVisible = true;
  }

  // Call this method to hide the modal
  hideModal(): void {
    this.isModalVisible = false;
  }

  confirmDeletion(): void {
    this.onConfirmDeletion.emit();  // Emit event to confirm deletion
    this.hideModal();
  }

  cancelDeletion(): void {
    this.onCancelDeletion.emit();  // Emit event to cancel deletion
    this.hideModal();
  }
}
