import { Component, OnInit, ViewChild } from '@angular/core';
import { BarberDataSource } from 'src/app/datasources/barber.datasource';
import { AuthService } from 'src/app/services/auth.service';
import { BarberService } from 'src/app/services/barber.service';
import { MatPaginator, MatDialog } from '@angular/material';
import { EditBarberComponent } from './edit-barber/edit-barber.component';
import { DeleteBarberComponent } from './delete-barber/delete-barber.component';
import { AddBarberComponent } from './add-barber/add-barber.component';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-barbers',
  templateUrl: './barbers.component.html',
  styleUrls: ['./barbers.component.scss']
})
export class BarbersComponent implements OnInit {

  public user: any;
  public role: any;

  barberData: BarberDataSource | null;
  displayedColumns: Array<string> = ['user_id', 'name', 'last_name', 'email', 'telephone_number', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
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

  add(barber: User): void {
    const dialogRef = this.dialog.open(AddBarberComponent, {
      width: '250px',
      data: barber
    });

    dialogRef.afterClosed().subscribe(result => {
      const params = {
        orderBy: 'name',
        sortedBy: 'asc',
        searchJoin: 'and',
        page: '1',
        page_size: '10'
      };
      this.barberData.get(params);
    });
  }

  edit(barber: User): void {
    const dialogRef = this.dialog.open(EditBarberComponent, {
      width: '250px',
      data: barber
    });

    dialogRef.afterClosed().subscribe(result => {
      const params = {
        orderBy: 'name',
        sortedBy: 'asc',
        searchJoin: 'and',
        page: '1',
        page_size: '10'
      };
      this.barberData.get(params);
    });
  }


  public delete(barber: User) {
    const dialogRef = this.dialog.open(DeleteBarberComponent, {
      width: '250px',
      data: barber
    });

    dialogRef.afterClosed().subscribe(result => {
      const params = {
        orderBy: 'name',
        sortedBy: 'asc',
        searchJoin: 'and',
        page: '1',
        page_size: '10'
      };
      this.barberData.get(params);
    });
  }

}
