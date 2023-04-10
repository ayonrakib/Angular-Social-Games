import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class CallModal {
  modalBody!: string;
  modalTitle!: string;
  constructor() {}
  callModal(modalBody: string, modalTitle: string): void {
    this.modalBody = modalBody;
    this.modalTitle = modalTitle;
    let modalButton = document.getElementById('modalButton');
    modalButton?.click();
  }
}
