import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: any;
  public role: any;
  public storage: any;

  constructor(
    private productService: ProductService,
    private auth: AuthService
    ) { }

  ngOnInit() {
    this.auth.profile().then((response) => {
      this.user = response.user;
      this.role = response.role;
    }, (err) => {
      console.error(err);
    });

    this.getProductsOnStorage();
  }

  getProductsOnStorage(): any {
    this.productService.getStorage()
      .then((response: any) => {
        this.storage = response.length;
      });
  }
}
