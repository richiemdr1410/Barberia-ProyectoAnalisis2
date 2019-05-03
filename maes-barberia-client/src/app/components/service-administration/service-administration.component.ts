import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceDataSource } from 'src/app/datasources/service.datasource';
import { MatPaginator, MatDialog } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceAdministrationService } from 'src/app/services/service-administracion.service';
import { Service } from 'src/app/models/service.model';
import { AddServiceComponent } from './add-service/add-service.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { DeleteServiceComponent } from './delete-service/delete-service.component';

@Component({
  selector: 'app-service-administration',
  templateUrl: './service-administration.component.html',
  styleUrls: ['./service-administration.component.scss']
})
export class ServiceAdministrationComponent implements OnInit {

  public user: any;
  public role: any;

  servicetData: ServiceDataSource | null;
  displayedColumns: Array<string> = ['service_name', 'service_time', 'price', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private service: ServiceAdministrationService,
  ) { }

  ngOnInit() {
    this.auth.profile().then((response) => {
      this.user = response.user;
      this.role = response.role;
    }, (err) => {
      console.error(err);
    });

    this.servicetData = new ServiceDataSource(this.service, this.paginator);
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
