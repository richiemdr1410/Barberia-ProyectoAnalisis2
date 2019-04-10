import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material';
import { Product } from '../models/product.model';
import { ProductPagination } from '../pagination/product.pagination.model';
import { ServicesService } from '../services/services.service';
import { Service } from '../models/service.model';


export class ServiceDataSource implements DataSource<Service> {

  private dataSubject = new BehaviorSubject<Service[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private servicesService: ServicesService,
    public paginator: MatPaginator
  ) { }

  connect(collectionViewer: CollectionViewer): Observable<Product[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }

  get(params: any) {
    this.loadingSubject.next(true);
    this.servicesService.get(params).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
      ).subscribe((response: ProductPagination) => {
        this.dataSubject.next(response.data as Product[]);
      });
  }
}
