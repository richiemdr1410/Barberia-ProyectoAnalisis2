import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatDialog } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationDataSource } from 'src/app/datasources/reservation.datasource';
import { BarberDeliverReservationComponent } from './barber-deliver-reservation/barber-deliver-reservation.component';
import { AlertService } from 'src/app/services/alert.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-barber-reservation',
  templateUrl: './barber-reservation.component.html',
  styleUrls: ['./barber-reservation.component.scss']
})
export class BarberReservationComponent implements OnInit {

  public user: any;
  public role: any;

  reservationData: ReservationDataSource | null;
  displayedColumns: Array<string> = ['name', 'reservation_quantity', 'price', 'status', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private alertService: AlertService,
    private reservataionService: ReservationService,
  ) { }

  ngOnInit() {
    this.auth.profile().then((response) => {
      this.user = response.user;
      this.role = response.role;
      this.getReservation();
    }, (err) => {
      console.error(err);
    });
  }

  private getReservation() {
    this.reservationData = new ReservationDataSource(this.reservataionService, this.paginator);
    const params = {
      orderBy: 'reservation_id',
      sortedBy: 'asc',
      searchJoin: 'and',
      page: '1',
      page_size: '10',
    };
    this.reservationData.all(params);
  }

  public delete(reservation: any) {
    const dialogRef = this.dialog.open(BarberDeliverReservationComponent, {
      width: '250px',
      data: reservation
    });

    dialogRef.afterClosed().subscribe(result => {
      const params = {
        orderBy: 'reservation_id',
        sortedBy: 'asc',
        searchJoin: 'and',
        page: '1',
        page_size: '10',
        user_id: this.user.id
      };
      this.reservationData.all(params);
    });
  }

}
