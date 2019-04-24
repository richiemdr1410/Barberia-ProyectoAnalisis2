import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CarouselService } from 'src/app/services/carousel.service';
import { ImageService } from 'src/app/services/image.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-carousel',
  templateUrl: './add-carousel.component.html',
  styleUrls: ['./add-carousel.component.scss']
})
export class AddCarouselComponent implements OnInit {

  myForm: FormGroup;

  newCarousel = {
    name: '',
    description: '',
    image: ''
  };

  newImage = {
    image: '',
    type: 'carusel'
  };

  constructor(
    private fb: FormBuilder,
    public service: CarouselService,
    public imageService: ImageService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<AddCarouselComponent>,
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  create(): void {
    this.getData();
    this.service.create(this.newCarousel)
      .then(
        success => {
        },
        error => {
          this.alertService.error('Error al actualizar el servicio', 5, error.ExceptionMessage);
        }
      );
  }

  getData(): any {
    this.newCarousel.name = this.myForm.controls.name.value;
    this.newCarousel.description = this.myForm.controls.description.value;
    this.newCarousel.image = this.myForm.controls.image.value.fileNames;
  }

}
