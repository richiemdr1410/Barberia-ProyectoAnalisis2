import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-administrator',
  templateUrl: './delete-administrator.component.html',
  styleUrls: ['./delete-administrator.component.scss']
})
export class DeleteAdministratorComponent implements OnInit {

  constructor(
    public service: UserService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<DeleteAdministratorComponent>,
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
          this.alertService.success('Administrador eliminado');
          this.dialogRef.close();
        },
        error => {
          this.alertService.error('Error al eliminar el Administrador', 5, error.ExceptionMessage);
        });
  }

}
