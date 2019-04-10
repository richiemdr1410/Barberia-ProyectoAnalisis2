import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProductPagination } from '../pagination/product.pagination.model';
import { throwError as observableThrowError } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class ServicesService {

    public path = 'http://127.0.0.1:8000/api/service';

  constructor(
    protected http: HttpClient
  ) { }

  get(data: any): Observable<ProductPagination> {
    const params = new HttpParams({fromObject: data});
    return this.http.get(this.path, {params})
      .pipe(
        map((response: any) => response as ProductPagination),
        catchError(error => observableThrowError(error))
      );
  }

//   update(click: Clicks): Promise<Clicks> {
//     const path = `${this.path}/${click.invoice}`;

//     return this.http.put(path, click)
//       .toPromise()
//       .then(response => {
//         return response as Clicks;
//       })
//       .catch(this.handleError);
//   }

  extractData(result: any): any {
    return result;
  }

//   create(data: Clicks): Promise<any> {
//     return this.http.post(this.path, data)
//       .toPromise()
//       .then((response: any) => response as Clicks)
//       .catch(this.handleError);
//   }

  protected handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
