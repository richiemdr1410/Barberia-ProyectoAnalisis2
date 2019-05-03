import { Component, OnInit, Inject } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-appointment',
  templateUrl: './delete-appointment.component.html',
  styleUrls: ['./delete-appointment.component.scss']
})
export class DeleteAppointmentComponent implements OnInit {

  constructor(
    public service: AppointmentService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<DeleteAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.service.delete(this.data.appointment_id)
      .subscribe(
        success => {
          this.alertService.success('Cita cancelada');
          this.dialogRef.close();
        },
        error => {
          this.alertService.error('Error al cancelar la cita', 5, error.ExceptionMessage);
        });
  }

}
