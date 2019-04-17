import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProductPagination } from '../pagination/product.pagination.model';
import { throwError as observableThrowError } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })

export class ProductService {

  public path = 'http://127.0.0.1:8000/api/product';

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

  create(data: any): Promise<Product> {
    return this.http.post(this.path, data)
      .toPromise()
      .then(response => {
        return response as Product;
      })
      .catch(this.handleError);
  }

  getStorage(): Promise<Product> {
    const path = 'http://127.0.0.1:8000/api/storage';

    return this.http.get(path)
      .toPromise()
      .then((response: any) => {
        return response as Product;
      })
      .catch(this.handleError);
  }

  getStorageProducts(data: any): Observable<ProductPagination> {
    const path = 'http://127.0.0.1:8000/api/storage';
    const params = new HttpParams({fromObject: data});

    return this.http.get(path, {params})
      .pipe(
        map((response: any) => response as ProductPagination),
        catchError(error => observableThrowError(error))
      );
  }

  update(product: Product): Promise<Product> {
    const path = `${this.path}/${product.id}`;

    return this.http.put(path, product)
      .toPromise()
      .then(response => {
        return response as Product;
      })
      .catch(this.handleError);
  }

  updateStorage(product: Product): Promise<Product> {
    const path = `http://127.0.0.1:8000/api/storage/increase/${product.id}`;

    return this.http.put(path, product)
      .toPromise()
      .then(response => {
        return response as Product;
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
