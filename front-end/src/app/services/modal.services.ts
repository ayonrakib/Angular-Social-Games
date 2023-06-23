import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor() {}

  callModal(): void {
    let modalButton = document.getElementById('modalButton');
    modalButton?.click();
  }
}
