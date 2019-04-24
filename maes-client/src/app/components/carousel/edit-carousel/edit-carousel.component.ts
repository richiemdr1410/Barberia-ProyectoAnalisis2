import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CarouselService } from 'src/app/services/carousel.service';
import { ImageService } from 'src/app/services/image.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-carousel',
  templateUrl: './edit-carousel.component.html',
  styleUrls: ['./edit-carousel.component.scss']
})
export class EditCarouselComponent implements OnInit {

  myForm: FormGroup;

  newCarousel = {
    id: 0,
    name: '',
    description: '',
    image: '',
    enable: 0
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
    public dialogRef: MatDialogRef<EditCarouselComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: new FormControl(this.data.name, Validators.required),
      description: new FormControl(this.data.description, Validators.required),
      enable: new FormControl(this.data.enable, Validators.required),
      image: new FormControl(this.data.image, Validators.required)
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  update(): void {
    this.getData();
    this.service.update(this.newCarousel)
      .then(
        success => {
            this.alertService.success('Imagen actualizado');
            this.dialogRef.close();
        },
        error => {
          this.alertService.error('Error al actualizar la imagen', 5, error.ExceptionMessage);
        }
      );
  }

  getData(): any {
    this.newCarousel.id = this.data.id;
    this.newCarousel.name = this.myForm.controls.name.value;
    this.newCarousel.description = this.myForm.controls.description.value;
    this.newCarousel.enable = this.myForm.controls.enable.value ? 1 : 0;
    this.newCarousel.image = this.myForm.controls.image.value.fileNames;
  }

}
