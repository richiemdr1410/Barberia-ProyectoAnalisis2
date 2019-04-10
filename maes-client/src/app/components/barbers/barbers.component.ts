import { Component, OnInit, ViewChild } from '@angular/core';
import { BarberDataSource } from 'src/app/datasources/barber.datasource';
import { AuthService } from 'src/app/services/auth.service';
import { BarberService } from 'src/app/services/barber.service';
import { MatPaginator } from '@angular/material';
import { Barber } from 'src/app/models/barber.model';

@Component({
  selector: 'app-barbers',
  templateUrl: './barbers.component.html',
  styleUrls: ['./barbers.component.scss']
})
export class BarbersComponent implements OnInit {

  public user: any;
  public role: any;

  barberData: BarberDataSource | null;
  displayedColumns: Array<string> = ['name', 'last_name', 'email', 'telephone_number', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private auth: AuthService,
    private productService: BarberService,
  ) { }

  ngOnInit() {
    this.auth.profile().then((response) => {
      this.user = response.user;
      this.role = response.role;
    }, (err) => {
      console.error(err);
    });

    this.barberData = new BarberDataSource(this.productService, this.paginator);
    const params = {
      orderBy: 'name',
      sortedBy: 'asc',
      searchJoin: 'and',
      page: '1',
      page_size: '10'
    };
    this.barberData.get(params);
  }

  public add() {
    console.log('add');
  }

  public edit(barber: Barber) {
    console.log(barber);
  }

  public delete(barber: Barber) {
    console.log(barber);
  }

}
