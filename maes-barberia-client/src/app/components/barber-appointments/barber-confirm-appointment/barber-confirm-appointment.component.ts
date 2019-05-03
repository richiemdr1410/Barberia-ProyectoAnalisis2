import { Component, OnInit, Inject } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-barber-confirm-appointment',
  templateUrl: './barber-confirm-appointment.component.html',
  styleUrls: ['./barber-confirm-appointment.component.scss']
})
export class BarberConfirmAppointmentComponent implements OnInit {

  constructor(
    public service: AppointmentService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<BarberConfirmAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.service.update(this.data.appointment_id, this.data).then(
      (result) => {
        this.dialogRef.close();
        this.alertService.success('La cita ha sido realizada');
      }
    );
  }

}
