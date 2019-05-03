import { Component, OnInit, Inject } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-barber-deliver-reservation',
  templateUrl: './barber-deliver-reservation.component.html',
  styleUrls: ['./barber-deliver-reservation.component.scss']
})
export class BarberDeliverReservationComponent implements OnInit {

  reservation = {
    delivered: 0
  };
  constructor(
    public service: ReservationService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<BarberDeliverReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  deliver(): void {
    this.service.deliver(this.data.reservation_id, this.reservation)
      .then(
        success => {
          this.alertService.success('Producto entregado');
          this.dialogRef.close();
        },
        error => {
          this.alertService.error('Error al entregar el producto', 5, error.ExceptionMessage);
        });
  }

}
