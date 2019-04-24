import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CarouselService } from 'src/app/services/carousel.service';
import { ImageService } from 'src/app/services/image.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-carousel',
  templateUrl: './delete-carousel.component.html',
  styleUrls: ['./delete-carousel.component.scss']
})
export class DeleteCarouselComponent implements OnInit {

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
    public dialogRef: MatDialogRef<DeleteCarouselComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.service.delete(this.data.id)
      .subscribe(
        success => {
          this.alertService.success('Imagen eliminada');
          this.dialogRef.close();
        },
        error => {
          this.alertService.error('Error al eliminar la imagen', 5, error.ExceptionMessage);
        });
  }

}
