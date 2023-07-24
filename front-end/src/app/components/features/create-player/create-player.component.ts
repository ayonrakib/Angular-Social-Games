import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../../services/image.service';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ModalService } from 'src/app/services/modal.services';
import { Router } from '@angular/router';
// import CallModal from 'src/app/utils/CallModal';
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css'],
})
export class CreatePlayerComponent implements OnInit {
  selectedFile!: ImageSnippet;
  files: any;
  constructor(
    private imageService: ImageService,
    private userService: UserService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private modalService: ModalService // private callModal: CallModal
  ) {}

  async ngOnInit(): Promise<void> {
    await this.userService.authorizeIfAdmin();
  }
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  modalBody!: string;
  modalTitle!: string;

  async create(): Promise<void> {
    console.log(
      'the fields in create player are: ',
      this.firstName,
      this.lastName,
      this.email
    );
    const isPlayerCreated = await this.userService.create(
      this.firstName,
      this.lastName,
      this.email,
      this.password
    );
    console.log(
      'isplayer created response in create player component: ',
      isPlayerCreated
    );
    console.log(
      'isplayer created response.data in create player component: ',
      isPlayerCreated.data
    );
    if (isPlayerCreated.data === null) {
      console.log('calling modal in create player component in error input!');
      this.modalBody = isPlayerCreated.error.errorMessage;
      this.modalTitle = 'error!';
    } else {
      this.modalBody = 'Successfully created the player!';
      this.modalTitle = 'Success!';
    }
    this.modalService.callModal();
  }
}
