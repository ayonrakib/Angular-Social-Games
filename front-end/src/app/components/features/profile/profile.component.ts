import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ModalService } from 'src/app/services/modal.services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private modalService: ModalService
  ) {}

  profileData: any = null;
  profilePicture!: File;
  modalBody!: string;
  modalTitle!: string;

  ngOnInit(): void {
    this.userService.getProfileData().then((profileData) => {
      this.profileData = profileData.data.data;
    });
  }
  onFileChange(event: any): void {
    this.profilePicture = event.target.files[0];
  }

  async updateProfilePicture(): Promise<void> {
    const session = this.authenticationService.getSession();
    const signedURLForUploadingProfilePicture =
      await this.userService.getSignedURLForUploadingProfilePicture(session);

    const profilePictureURL = await this.userService.uploadProfilePicture(
      signedURLForUploadingProfilePicture.data,
      this.profilePicture
    );

    const assignProfilePicture = await this.userService.assignProfilePicture(
      profilePictureURL
    );

    console.log(
      'assignProfilePicture.data in profile component: ',
      assignProfilePicture.data
    );
    if (assignProfilePicture.data.data) {
      this.modalBody = 'Image uploaded successfully!';
      this.modalTitle = 'Success!';
    } else {
      this.modalBody = assignProfilePicture.data.error.errorMessage;
      this.modalTitle = assignProfilePicture.data.error.errorCode + ' error!';
    }
    this.modalService.callModal();
  }
}
