import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/products.service';
import { MatDialog } from '@angular/material';
import { AppointmentConfirmationComponent } from '../appointment-confirmation/appointment-confirmation.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public user: any;
  public role: any;
  public storage: any;

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private auth: AuthService
    ) { }

  ngOnInit() {
    this.auth.profile().then((response) => {
      this.user = response.user;
      this.role = response.role;
      if (localStorage.getItem('appointment') === 'true' && response.role.name === 'client') {
        this.getAppointmentConfirmation();
      }
    }, (err) => {
      console.error(err);
    });
    this.getProductsOnStorage();
  }

  getAppointmentConfirmation(): any {
    this.dialog.open(AppointmentConfirmationComponent, {
      width: '300px'
    });
  }

  getProductsOnStorage(): any {
    this.productService.getStorage()
      .then((response: any) => {
        this.storage = response.total;
      });
  }

}
