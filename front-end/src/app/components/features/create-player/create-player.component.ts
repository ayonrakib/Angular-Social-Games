import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../../services/image.service';
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css']
})
export class CreatePlayerComponent implements OnInit {
  selectedFile!: ImageSnippet;
  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
  }
  firstName:string = "";
  lastName:string = "";
  email:string = "";
  password:string = "";
  image:string = "";
  fileToUpload: File | null = null;

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}

  // uploadFileToActivity() {
  //   this.imageService.postFile(this.fileToUpload).subscribe((data: any) => {
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
