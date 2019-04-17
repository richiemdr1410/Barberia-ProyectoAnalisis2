import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductsComponent } from './components/products/products.component';
import { ServicesComponent } from './components/service/services.component';
import { StorageComponent } from './components/storage/storage.component';
import { BarbersComponent } from './components/barbers/barbers.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { ScheduleComponent } from './components/schedule/schedule.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', canActivate: [ AuthGuard ], component: ProfileComponent },
  { path: 'clients', canActivate: [ AuthGuard ], component: ClientsComponent },
  { path: 'products', canActivate: [ AuthGuard ], component: ProductsComponent },
  { path: 'services', canActivate: [ AuthGuard ], component: ServicesComponent },
  { path: 'storage', canActivate: [ AuthGuard ], component: StorageComponent },
  { path: 'barbers', canActivate: [ AuthGuard ], component: BarbersComponent },
  { path: 'appointments', canActivate: [ AuthGuard ], component: AppointmentsComponent },
  { path: 'schedule', canActivate: [ AuthGuard ], component: ScheduleComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
