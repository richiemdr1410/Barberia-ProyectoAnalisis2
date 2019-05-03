import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef } from '@angular/material';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment } from 'src/app/models/appointment.model';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-appointment-confirmation',
  templateUrl: './appointment-confirmation.component.html',
  styleUrls: ['./appointment-confirmation.component.scss']
})
export class AppointmentConfirmationComponent implements OnInit {

  date: any;
  hour: any;
  id: any;
  appointment = {
    id_service: 0,
    barber_id: 0,
    id_user: 0,
    time: '',
    date: ''
  };
  public user: any;
  public role: any;

  constructor(
    private auth: AuthService,
    private alert: AlertService,
    private appointmentService: AppointmentService,
    public dialogRef: MatDialogRef<AppointmentConfirmationComponent>
  ) {
  }

  ngOnInit() {
    this.date = localStorage.getItem('date');
    this.hour = localStorage.getItem('time');
    this.auth.profile().then((response) => {
      this.user = response.user;
      this.role = response.role;
    }, (err) => {
      console.error(err);
    });
  }

  cancel(): void {
    localStorage.removeItem('appointment');
    localStorage.removeItem('barber_id');
    localStorage.removeItem('category_id');
    localStorage.removeItem('date');
    localStorage.removeItem('id_service');
    localStorage.removeItem('id_user');
    localStorage.removeItem('time');
    this.dialogRef.close();
  }

  create(): void {
    this.getParams();
    this.appointmentService.create(this.appointment).then(
      (appointment) => {
        this.cancel();
        this.alert.success('La cita ha sido agendada');
        this.removeStorage();
      }
    );

  }

  private removeStorage() {
    localStorage.removeItem('appointment');
    localStorage.removeItem('barber_id');
    localStorage.removeItem('category_id');
    localStorage.removeItem('date');
    localStorage.removeItem('id_service');
    localStorage.removeItem('id_user');
    localStorage.removeItem('time');
  }

  getParams(): any {
    this.appointment.id_service = parseInt(localStorage.getItem('id_service'), 10);
    this.appointment.barber_id = Number(localStorage.getItem('barber_id')) > 0 ? Number(localStorage.getItem('barber_id')) : null;
    this.appointment.id_user = this.user.id;
    this.appointment.time = localStorage.getItem('time');
    this.appointment.date = localStorage.getItem('date');
  }

}
