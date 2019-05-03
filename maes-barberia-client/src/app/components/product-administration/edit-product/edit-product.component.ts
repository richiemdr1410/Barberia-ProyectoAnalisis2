import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/products.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from 'src/app/models/product.model';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  newProduct = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    comments: '',
    status: 1,
    quantity: 0,
    image: ''
  };

  newImage = {
    image: '',
    type: 'products'
  };

  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public service: ProductService,
    public imageService: ImageService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: new FormControl(this.data.name, Validators.required),
      description: new FormControl(this.data.description),
      price: new FormControl(this.data.price, Validators.required),
      comments: new FormControl(this.data.comments),
      quantity: new FormControl(this.data.quantity, Validators.required),
      image: new FormControl('', Validators.required)
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  edit(): void {
    this.getData();
    this.service.update(this.newProduct)
      .then(
        success => {
          if (this.newImage.image) {
            this.imageService.create(this.newImage).then(
              data => {
                this.alertService.success('Producto actualizado');
                this.dialogRef.close();
              }
            );
          } else {
            this.alertService.success('Producto actualizado');
            this.dialogRef.close();
          }
        },
        error => {
          this.alertService.error('Error al actualizar el producto', 5, error.ExceptionMessage);
        }
      );
  }

  getData(): any {
    this.newProduct.id = this.data.id;
    this.newProduct.name = this.myForm.controls.name.value;
    this.newProduct.description = this.myForm.controls.description.value;
    this.newProduct.price = this.myForm.controls.price.value;
    this.newProduct.comments = this.myForm.controls.comments.value;
    this.newProduct.quantity = this.myForm.controls.quantity.value;
    this.newProduct.image = this.myForm.controls.image.value.fileNames;
    this.newImage.image = this.myForm.controls.image.value;
  }

}
