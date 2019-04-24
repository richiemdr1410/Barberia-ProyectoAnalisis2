import { Component, OnInit, ViewChild } from '@angular/core';
import { AdministratorDataSource } from 'src/app/datasources/admin.datasource';
import { MatDialog, MatPaginator } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { AdministratorService } from 'src/app/services/admin.service';
import { Administrator } from 'src/app/models/administrator.model';
import { AddAdministratorComponent } from './add-administrator/add-administrator.component';
import { EditAdministratorComponent } from './edit-administrator/edit-administrator.component';
import { DeleteAdministratorComponent } from './delete-administrator/delete-administrator.component';

@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.component.html',
  styleUrls: ['./administrators.component.scss']
})
export class AdministratorsComponent implements OnInit {

  public user: any;
  public role: any;

  adminData: AdministratorDataSource | null;
  displayedColumns: Array<string> = ['user_id', 'name', 'last_name', 'email', 'telephone_number', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private adminService: AdministratorService,
  ) { }

  ngOnInit() {
    this.auth.profile().then((response) => {
      this.user = response.user;
      this.role = response.role;
    }, (err) => {
      console.error(err);
    });

    this.adminData = new AdministratorDataSource(this.adminService, this.paginator);
    const params = {
      orderBy: 'name',
      sortedBy: 'asc',
      searchJoin: 'and',
      page: '1',
      page_size: '10'
    };
    this.adminData.get(params);
  }

  add(admin: Administrator): void {
    const dialogRef = this.dialog.open(AddAdministratorComponent, {
      width: '250px',
      data: admin
    });

    dialogRef.afterClosed().subscribe(result => {
      const params = {
        orderBy: 'name',
        sortedBy: 'asc',
        searchJoin: 'and',
        page: '1',
        page_size: '10'
      };
      this.adminData.get(params);
    });
  }

  edit(admin: Administrator): void {
    const dialogRef = this.dialog.open(EditAdministratorComponent, {
      width: '250px',
      data: admin
    });

    dialogRef.afterClosed().subscribe(result => {
      const params = {
        orderBy: 'name',
        sortedBy: 'asc',
        searchJoin: 'and',
        page: '1',
        page_size: '10'
      };
      this.adminData.get(params);
    });
  }

}
