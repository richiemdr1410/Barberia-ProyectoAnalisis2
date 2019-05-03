import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-delete-product-reservation',
  templateUrl: './delete-product-reservation.component.html',
  styleUrls: ['./delete-product-reservation.component.scss']
})
export class DeleteProductReservationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteProductReservationComponent>,
    private auth: AuthService,
    private alertService: AlertService,
    private reservataionService: ReservationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  cancel(): void {
    this.dialogRef.close();
  }


  delete() {
    this.reservataionService.delete(this.data.reservation_id)
      .subscribe(
        success => {
          this.cancel();
          this.alertService.success('Reserva eliminada');
        },
        error => {
          this.alertService.error('Error al eliminar la reserva', 5, error.ExceptionMessage);
        });
  }

}
