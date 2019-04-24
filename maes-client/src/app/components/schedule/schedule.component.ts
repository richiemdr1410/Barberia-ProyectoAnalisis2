import { Component, OnInit } from '@angular/core';
import { BarberService } from 'src/app/services/barber.service';
import { MatDialog } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  public user: any;
  public role: any;
  barbers: any;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private barberService: BarberService
  ) { }

  ngOnInit() {
    this.getRoles();
    //this.getBarbers();
  }

  getRoles(): any {
    this.auth.profile().then((response) => {
      this.user = response.user;
      this.role = response.role;
    }, (err) => {
      console.error(err);
    });
  }

  getBarbers() {
    const params = {
      orderBy: 'name',
      sortedBy: 'asc',
      searchJoin: 'and',
      page: '1',
      page_size: '10'
    };
    this.barberService.get(params).subscribe(
      barber => {
        this.barbers = barber;
      },
    );
  }

}
