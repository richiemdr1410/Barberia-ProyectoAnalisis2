import { Component, OnInit, Inject } from '@angular/core';
import { BarberService } from 'src/app/services/barber.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Barber } from 'src/app/models/barber.model';

@Component({
  selector: 'app-delete-barber',
  templateUrl: './delete-barber.component.html',
  styleUrls: ['./delete-barber.component.scss']
})
export class DeleteBarberComponent implements OnInit {

  constructor(
    public service: BarberService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<DeleteBarberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Barber
  ) { }

  ngOnInit() {
    console.log(this.data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.service.delete(this.data.id)
      .subscribe(
        success => {
          this.alertService.success('Barbero eliminado');
          this.dialogRef.close();
        },
        error => {
          this.alertService.error('Error al eliminar el Barbero', 5, error.ExceptionMessage);
        });
  }


}
