import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../../services/image.service';
import { PlayerService } from 'src/app/services/player.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
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
    private playerService: PlayerService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  image: string = '';
  profilePicture: File | null = null;

  handleFileInput(files: FileList) {
    this.profilePicture = files.item(0);
  }

  onFileChange(event: any): void {
    this.profilePicture = event.target.files[0];
    console.log(event.target.files[0]);
  }

  async create(): Promise<void> {
    console.log(
      'the fields in create player are: ',
      this.firstName,
      this.lastName,
      this.email,
      this.profilePicture
    );
    const session = this.authenticationService.getSession();
    const isPlayerCreated = await this.playerService.create(
      this.firstName,
      this.lastName,
      this.email,
      this.profilePicture,
      session
    );
    console.log('isplayer created response: ', isPlayerCreated);
  }

  // uploadFileToActivity() {
  //   this.imageService.postFile(this.profilePicture).subscribe((data: any) => {
  //     // do something, if upload success
  //     }, (error: any) => {
  //       console.log(error);
  //     });
  // }
  // processFile(imageInput: any) {
  //   const file: File = imageInput.files[0];
  //   const reader = new FileReader();

  //   reader.addEventListener('load', (event: any) => {

  //     this.selectedFile = new ImageSnippet(event.target.result, file);

  //     this.imageService.uploadImage(this.selectedFile.file).subscribe(
  //       (res:any) => {

  //       },
  //       (err:any) => {

  //       })
  //   });

  //   reader.readAsDataURL(file);
  // }
}
