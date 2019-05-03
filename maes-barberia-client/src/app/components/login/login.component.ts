import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenPayload, AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  myForm: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private alert: AlertService
    ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    this.credentials.email = this.myForm.controls.email.value;
    this.credentials.password = this.myForm.controls.password.value;
    this.auth.login(this.credentials).subscribe((response) => {
      this.auth.saveToken(response.access_token);
      this.router.navigateByUrl('/dashboard');
    }, (err) => {
      this.alert.error('Correo o contraseña invalida. Por favor, inténtelo de nuevo');
    });
  }
}
