import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-cancel-reservation',
  templateUrl: './cancel-reservation.component.html',
  styleUrls: ['./cancel-reservation.component.scss']
})
export class CancelReservationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CancelReservationComponent>,
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
          this.alertService.success('Servicio eliminado');
        },
        error => {
          this.alertService.error('Error al eliminar el servicio', 5, error.ExceptionMessage);
        });
  }

}
