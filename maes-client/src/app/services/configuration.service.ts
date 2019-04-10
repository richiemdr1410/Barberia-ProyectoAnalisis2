import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Configuration } from '../models/configuration.model';

@Injectable({providedIn: 'root'})
export class ConfigurationService {

  public configuration: Configuration;

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) {
  }

  public handleForbiddenAccess() {
  }

  public handleLogout() {
  }

}
