import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/products.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialogRef } from '@angular/material';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  newProduct = {
    name: '',
    description: '',
    price: '',
    comments: '',
    status: 1,
    quantity: 0,
    image: ''
  };

  newImage = {
    image: '',
    type: 'productos'
  };

  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public service: ProductService,
    public imageService: ImageService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<AddProductComponent>,
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      price: new FormControl('', Validators.required),
      comments: new FormControl(''),
      quantity: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  create(): void {
    this.getData();
    this.service.create(this.newProduct)
      .then(
        success => {
          this.imageService.create(this.newImage).then(
            data => {
              this.alertService.success('Servicio actualizado');
              this.dialogRef.close();
            }
          );
        },
        error => {
          this.alertService.error('Error al actualizar el servicio', 5, error.ExceptionMessage);
        }
      );
  }

  getData(): any {
    this.newProduct.name = this.myForm.controls.name.value;
    this.newProduct.description = this.myForm.controls.description.value;
    this.newProduct.price = this.myForm.controls.price.value;
    this.newProduct.comments = this.myForm.controls.comments.value;
    this.newProduct.quantity = this.myForm.controls.quantity.value;
    this.newProduct.image = this.myForm.controls.image.value.fileNames;
    this.newImage.image = this.myForm.controls.image.value;
  }

}
