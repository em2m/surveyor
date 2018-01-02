import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

@Injectable()
export class FileUploadService {

  constructor() {}

  upload(url: string, file: File, additionalParams: any): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      const xhr: XMLHttpRequest = new XMLHttpRequest();

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.open('POST', url, true);
      xhr.setRequestHeader("Authorization", "Bearer ");

      const formData = new FormData();
      formData.append("file", file, file.name);
      for (const key in additionalParams) {
        if (additionalParams.hasOwnProperty(key)) {
          formData.append(key, additionalParams[key]);
        }
      }
      xhr.send(formData);
    });
  }

}
