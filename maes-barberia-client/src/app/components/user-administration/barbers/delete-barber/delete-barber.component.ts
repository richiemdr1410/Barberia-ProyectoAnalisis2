import { Component, OnInit, Inject } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-barber',
  templateUrl: './delete-barber.component.html',
  styleUrls: ['./delete-barber.component.scss']
})
export class DeleteBarberComponent implements OnInit {

  constructor(
    public service: UserService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<DeleteBarberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
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
          this.alertService.success('Barbero eliminado');
          this.dialogRef.close();
        },
        error => {
          this.alertService.error('Error al eliminar el Barbero', 5, error.ExceptionMessage);
        });
  }


}
