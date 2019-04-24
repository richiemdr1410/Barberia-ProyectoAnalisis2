import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public user: any;
  public role: any;

  myForm: FormGroup;

  newUser = {
    id: 0,
    user_id: 0,
    name: '',
    last_name: '',
    second_last_name: '',
    email: '',
    telephone_number: 0,
    password: '',
    role_id: 0
  };

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private client: ClientService,
  ) { }

  ngOnInit() {
    this.auth.profile().then((response) => {
      this.user = response.user;
      this.role = response.role;
      this.fillForm(response);
    }, (err) => {
      console.error(err);
    });
  }

  fillForm(data) {
    this.myForm = this.fb.group({
      user_id: new FormControl({value: data.user.user_id, disabled: true}),
      name: new FormControl(data.user.name),
      last_name: new FormControl(data.user.last_name),
      second_last_name: new FormControl(data.user.second_last_name),
      email: new FormControl(data.user.email),
      telephone_number: new FormControl(data.user.telephone_number),
      password: new FormControl(data.user.password),
      role: new FormControl(data.role.name)
    });
  }

  update() {
    this.getData();
    this.client.update(this.newUser)
      .then(
        success => {
        },
        error => {
        }
      );
  }

  getData(): any {
    this.newUser.id = this.user.id;
    this.newUser.user_id = this.myForm.controls.user_id.value;
    this.newUser.name = this.myForm.controls.name.value;
    this.newUser.last_name = this.myForm.controls.last_name.value;
    this.newUser.second_last_name = this.myForm.controls.second_last_name.value;
    this.newUser.email = this.myForm.controls.email.value;
    this.newUser.telephone_number = this.myForm.controls.telephone_number.value;
    this.newUser.password = this.myForm.controls.password.value;
      this.newUser.role_id = this.role.id;
  }

}
