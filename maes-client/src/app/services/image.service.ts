import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class ImageService {

  public path = 'http://127.0.0.1:8000/api/image/upload';

  constructor(
    protected http: HttpClient
  ) { }

  create(data: any): Promise<any> {
    const formData = new FormData();
    formData.append('image', data.image.files[0]);
    formData.append('type', data.type);
    return this.http.post(this.path, formData)
      .toPromise()
      .then(response => {
        return response as any;
      })
      .catch(this.handleError);
  }

  update(data: any): Promise<any> {
    const path = `${this.path}/${data.id}`;

    return this.http.put(path, data)
      .toPromise()
      .then(response => {
        return response as any;
      })
      .catch(this.handleError);
  }

  delete(id: number) {
    const path = `${this.path}/${id}`;
    return this.http.delete(path)
      .pipe(
        map((response: any) => response.data),
        catchError(error => observableThrowError(error))
      );
  }

  extractData(result: any): any {
    return result;
  }

  protected handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
