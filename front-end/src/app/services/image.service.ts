import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {


  baseApiUrl = "http://localhost:3000/read-image"
    
  constructor() { }
  
  // Returns an observable
  upload(file:any):void {
  
      // Create form data
      const formData = new FormData(); 
        
      // Store form name as "file" with file data
      formData.append("file", file, file.name);
        
      // Make http post request over api
      // with formData as req
      // return this.http.post(this.baseApiUrl, formData)
  }

//   postFile(fileToUpload: File): Observable<object> {
//     const endpoint = 'your-destination-url';
//     const formData: FormData = new FormData();
//     formData.append('fileKey', fileToUpload, fileToUpload.name);
//     return this.httpClient
//       .post(endpoint, formData);
// }
}
