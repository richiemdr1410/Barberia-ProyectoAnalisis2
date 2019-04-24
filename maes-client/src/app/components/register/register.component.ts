import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService, TokenPayload } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  newClient = {
    user_id: '',
    name: '',
    last_name: '',
    second_last_name: '',
    email: '',
    telephone_number: '',
    password: '',
    role_id: 3
  };

  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  myForm: FormGroup;

  constructor(
    public service: ClientService,
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
    ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      user_id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      second_last_name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      telephone_number: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required)
    });
  }

  create(): void {
    this.getData();
    this.service.create(this.newClient)
      .then(
        success => {
          this.credentials.email = this.myForm.controls.email.value;
          this.credentials.password = this.myForm.controls.password.value;
          this.auth.login(this.credentials).subscribe((response) => {
            this.auth.saveToken(response.access_token);
            this.router.navigateByUrl('/profile');
          }, (err) => {
            console.error(err);
          });
        },
        error => {
        }
      );
  }

  getData(): any {
    this.newClient.user_id = this.myForm.controls.user_id.value;
    this.newClient.name = this.myForm.controls.name.value;
    this.newClient.last_name = this.myForm.controls.last_name.value;
    this.newClient.second_last_name = this.myForm.controls.second_last_name.value;
    this.newClient.email = this.myForm.controls.email.value;
    this.newClient.telephone_number = this.myForm.controls.telephone_number.value;
    this.newClient.password = this.myForm.controls.password.value;
  }

}
