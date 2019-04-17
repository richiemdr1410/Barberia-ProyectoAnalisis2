import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceDataSource } from 'src/app/datasources/service.datasource';
import { MatPaginator, MatDialog } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { ServicesService } from 'src/app/services/services.service';
import { Service } from 'src/app/models/service.model';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { DeleteServiceComponent } from './delete-service/delete-service.component';
import { AddServiceComponent } from './add-service/add-service.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  public user: any;
  public role: any;

  servicetData: ServiceDataSource | null;
  displayedColumns: Array<string> = ['name', 'service_time', 'price', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private servicesService: ServicesService,
  ) { }

  ngOnInit() {
    this.auth.profile().then((response) => {
      this.user = response.user;
      this.role = response.role;
    }, (err) => {
      console.error(err);
    });

    this.servicetData = new ServiceDataSource(this.servicesService, this.paginator);
    const params = {
      orderBy: 'name',
      sortedBy: 'asc',
      searchJoin: 'and',
      page: '1',
      page_size: '10'
    };
    this.servicetData.get(params);
  }

  add(service: Service): void {
    const dialogRef = this.dialog.open(AddServiceComponent, {
      width: '250px',
      data: service
    });

    dialogRef.afterClosed().subscribe(result => {
      const params = {
        orderBy: 'name',
        sortedBy: 'asc',
        searchJoin: 'and',
        page: '1',
        page_size: '10'
      };
      this.servicetData.get(params);
    });
  }

  edit(service: Service): void {
    const dialogRef = this.dialog.open(EditServiceComponent, {
      width: '250px',
      data: service
    });

    dialogRef.afterClosed().subscribe(result => {
      const params = {
        orderBy: 'name',
        sortedBy: 'asc',
        searchJoin: 'and',
        page: '1',
        page_size: '10'
      };
      this.servicetData.get(params);
    });
  }

  public delete(service: Service) {
    const dialogRef = this.dialog.open(DeleteServiceComponent, {
      width: '250px',
      data: service
    });

    dialogRef.afterClosed().subscribe(result => {
      const params = {
        orderBy: 'name',
        sortedBy: 'asc',
        searchJoin: 'and',
        page: '1',
        page_size: '10'
      };
      this.servicetData.get(params);
    });
  }

}
