import { Component, OnInit } from '@angular/core';
import { BarberService } from 'src/app/services/barber.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  barbers: any;
  public user: any;
  public role: any;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private barberService: BarberService
  ) { }

  ngOnInit() {
    this.getUser();
    this.getBarbers();
  }

  getUser() {
    this.auth.profile().then((response) => {
      this.user = response.user;
      this.role = response.role;
    }, (err) => {
      console.error(err);
    });
  }

  getBarbers() {
    this.barberService.getBarber().subscribe(
      barber => {
        this.barbers = barber.data;
      },
    );
  }

}
