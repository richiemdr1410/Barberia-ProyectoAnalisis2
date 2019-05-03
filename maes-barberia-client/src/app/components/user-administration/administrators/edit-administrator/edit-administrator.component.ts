import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Role } from 'src/app/models/role.model';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-administrator',
  templateUrl: './edit-administrator.component.html',
  styleUrls: ['./edit-administrator.component.scss']
})
export class EditAdministratorComponent implements OnInit {

  myForm: FormGroup;

  public user: any;
  public role: any;

  roles: Role[] = [
    {id: 1, name: 'admin', display_name: 'Administrador'},
    {id: 2, name: 'barber', display_name: 'Barbero'},
    {id: 3, name: 'client', display_name: 'Cliente'}
  ];

  newAdmin = {
    id: 0,
    user_id: 0,
    name: '',
    last_name: '',
    second_last_name: '',
    email: '',
    telephone_number: 0,
    password: '',
    role_id: 2,
    error: false,
    message: ''
  };

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    public service: UserService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<EditAdministratorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) { }

  ngOnInit() {
    this.auth.profile().then((response) => {
      this.user = response.user;
      this.role = response.role;
    }, (err) => {
      console.error(err);
    });

    this.myForm = this.fb.group({
      user_id: new FormControl(this.data.user_id),
      name: new FormControl(this.data.name),
      last_name: new FormControl(this.data.last_name),
      second_last_name: new FormControl(this.data.second_last_name),
      email: new FormControl(this.data.email),
      telephone_number: new FormControl(this.data.telephone_number),
      password: new FormControl(this.data.password),
      role: new FormControl(this.data.role_id)
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  update(): void {
    this.getData();
    this.service.update(this.newAdmin)
      .then(
        success => {
          this.alertService.success('Barbero editado');
          this.dialogRef.close();
        },
        error => {
          this.alertService.error('Error al editar el barbero', 5, error.ExceptionMessage);
        }
      );
  }

  getData(): any {
    this.newAdmin.id = this.data.id;
    this.newAdmin.user_id = this.myForm.controls.user_id.value;
    this.newAdmin.name = this.myForm.controls.name.value;
    this.newAdmin.last_name = this.myForm.controls.last_name.value;
    this.newAdmin.second_last_name = this.myForm.controls.second_last_name.value;
    this.newAdmin.email = this.myForm.controls.email.value;
    this.newAdmin.telephone_number = this.myForm.controls.telephone_number.value;
    this.newAdmin.password = this.myForm.controls.password.value;
    this.newAdmin.role_id = this.myForm.controls.role.value;
  }

}
