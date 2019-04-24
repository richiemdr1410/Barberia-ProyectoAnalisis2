import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material';
import { Barber } from '../models/barber.model';
import { BarberPagination } from '../pagination/barber.pagination.model';
import { CarouselService } from '../services/carousel.service';

export class CarouselDataSource implements DataSource<any> {

  private dataSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private carouselService: CarouselService,
    public paginator: MatPaginator
  ) { }

  connect(collectionViewer: CollectionViewer): Observable<Barber[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }

  get(params: any) {
    this.loadingSubject.next(true);
    this.carouselService.get(params).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
      ).subscribe((response: BarberPagination) => {
        this.dataSubject.next(response.data as Barber[]);
      });
  }
}
