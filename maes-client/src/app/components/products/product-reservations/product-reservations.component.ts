import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/products.service';
import { MatDialog } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { Product } from 'src/app/models/product.model';
import { AddProductReservationComponent } from './add-product-reservation/add-product-reservation.component';
import { AskAppointmentComponent } from '../../appointments/ask-appointment/ask-appointment.component';

@Component({
  selector: 'app-product-reservations',
  templateUrl: './product-reservations.component.html',
  styleUrls: ['./product-reservations.component.scss']
})
export class ProductReservationsComponent implements OnInit {

  public products: any;
  public user: any;
  public role: any;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
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
