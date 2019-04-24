import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  public products: any;

  constructor(
    private router: Router,
    public productService: ProductService
  ) { }

  ngOnInit() {
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

  login() {
    this.router.navigate(['/login']);
  }

}
