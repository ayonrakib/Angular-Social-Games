import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../../services/image.service';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
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
    private authenticationService: AuthenticationService // private callModal: CallModal
  ) {}

  ngOnInit(): void {}
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
    const session = this.authenticationService.getSession();
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
    console.log(
      'isplayer created response.data.data in create player component: ',
      isPlayerCreated.data.data
    );
    if (isPlayerCreated.data.data === null) {
      console.log('calling modal in create player component in error input!');
      this.modalBody = isPlayerCreated.data.error.errorMessage;
      this.modalTitle = isPlayerCreated.data.error.errorCode + ' error!';
      // this.callModal.callModal(this.modalBody, this.modalTitle, '');
    }
  }
}
