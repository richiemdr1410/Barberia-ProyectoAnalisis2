import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/products.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material';
import { AddProductReservationComponent } from './add-product-reservation/add-product-reservation.component';
import { Product } from 'src/app/models/product.model';
import { AskAppointmentComponent } from '../client-appointments/ask-appointment/ask-appointment.component';

@Component({
  selector: 'app-client-reservation',
  templateUrl: './client-reservation.component.html',
  styleUrls: ['./client-reservation.component.scss']
})
export class ClientReservationComponent implements OnInit {

  public user: any;
  public role: any;

  public products: any;
  constructor(
    public dialog: MatDialog,
    public auth: AuthService,
    public productService: ProductService
  ) { }

  ngOnInit() {
    this.auth.profile().then((response) => {
      this.user = response.user;
      this.role = response.role;
    }, (err) => {
      console.error(err);
    });
    this.getProducts();
  }

  getProducts(): any {
    const params = {
      orderBy: 'name',
      sortedBy: 'asc',
      searchJoin: 'and',
      page: '1',
      page_size: '100'
    };
    this.productService.get(params).subscribe(
      (products) => {
        this.products = products.data;
      }
    );
  }

  reservar(product: Product) {
    const dialogRef = this.dialog.open(AddProductReservationComponent, {
      width: '300px',
      data: {product: product, user: this.user}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialog.open(AskAppointmentComponent, {
        width: '300px'
      });
    });
  }

}
