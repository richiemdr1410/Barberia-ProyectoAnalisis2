import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Service } from 'src/app/models/service.model';
import { AlertService } from 'src/app/services/alert.service';
import { ServiceAdministrationService } from 'src/app/services/service-administracion.service';

@Component({
  selector: 'app-delete-service',
  templateUrl: './delete-service.component.html',
  styleUrls: ['./delete-service.component.scss']
})
export class DeleteServiceComponent implements OnInit {

  constructor(
    public service: ServiceAdministrationService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<DeleteServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Service
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
          this.alertService.success('Servicio eliminado');
          this.dialogRef.close();
        },
        error => {
          this.alertService.error('Error al eliminar el servicio', 5, error.ExceptionMessage);
        });
  }

}
