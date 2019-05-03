import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-administrator',
  templateUrl: './add-administrator.component.html',
  styleUrls: ['./add-administrator.component.scss']
})
export class AddAdministratorComponent implements OnInit {

  myForm: FormGroup;

  newAdmin = {
    user_id: 0,
    name: '',
    last_name: '',
    second_last_name: '',
    email: '',
    telephone_number: '',
    password: '',
    role_id: 1
  };

  constructor(
    private fb: FormBuilder,
    public service: UserService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<AddAdministratorComponent>,
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      user_id: new FormControl(''),
      name: new FormControl(''),
      last_name: new FormControl(''),
      second_last_name: new FormControl(''),
      email: new FormControl(''),
      telephone_number: new FormControl(''),
      password: new FormControl('')
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  create(): void {
    this.getData();
    this.service.create(this.newAdmin)
      .then(
        success => {
          this.alertService.success('Administrador creado');
          this.dialogRef.close();
        },
        error => {
          this.alertService.error('Error al crear el administrador', 5, error.ExceptionMessage);
        }
      );
  }

  getData(): any {
    this.newAdmin.user_id = this.myForm.controls.user_id.value;
    this.newAdmin.name = this.myForm.controls.name.value;
    this.newAdmin.last_name = this.myForm.controls.last_name.value;
    this.newAdmin.second_last_name = this.myForm.controls.second_last_name.value;
    this.newAdmin.email = this.myForm.controls.email.value;
    this.newAdmin.telephone_number = this.myForm.controls.telephone_number.value;
    this.newAdmin.password = this.myForm.controls.password.value;
  }

}
