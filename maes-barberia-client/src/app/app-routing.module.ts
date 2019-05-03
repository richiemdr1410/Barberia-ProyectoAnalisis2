import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { ServicesComponent } from './components/services/services.component';
import { ProductsComponent } from './components/products/products.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DoubtsComponent } from './components/doubts/doubts.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AdministratorsComponent } from './components/user-administration/administrators/administrators.component';
import { BarbersComponent } from './components/user-administration/barbers/barbers.component';
import { ClientsComponent } from './components/user-administration/clients/clients.component';
import { ProductAdministrationComponent } from './components/product-administration/product-administration.component';
import { ServiceAdministrationComponent } from './components/service-administration/service-administration.component';
import { AccountComponent } from './components/account/account.component';
import { ScheduleAdministrationComponent } from './components/schedule-administration/schedule-administration.component';
import { StorageComponent } from './components/storage/storage.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ClientAppointmentsComponent } from './components/client-appointments/client-appointments.component';
import { MyAppointmentComponent } from './components/my-appointment/my-appointment.component';
import { ClientReservationComponent } from './components/client-reservation/client-reservation.component';
import { ProductReservationComponent } from './components/product-reservation/product-reservation.component';
import { LogoutComponent } from './components/logout/logout.component';
import { BarberReservationComponent } from './components/barber-reservation/barber-reservation.component';
import { BarberAppointmentsComponent } from './components/barber-appointments/barber-appointments.component';
import { BarberServicesComponent } from './components/barber-services/barber-services.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'doubts', component: DoubtsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // log in
  { path: 'dashboard', canActivate: [ AuthGuard ], component: DashboardComponent },
  { path: 'account', canActivate: [ AuthGuard ], component: AccountComponent },
  { path: 'administrators', canActivate: [ AuthGuard ], component: AdministratorsComponent },
  { path: 'barbers', canActivate: [ AuthGuard ], component: BarbersComponent },
  { path: 'clients', canActivate: [ AuthGuard ], component: ClientsComponent },
  { path: 'product-administration', canActivate: [ AuthGuard ], component: ProductAdministrationComponent },
  { path: 'service-administration', canActivate: [ AuthGuard ], component: ServiceAdministrationComponent },
  { path: 'schedule-administration', canActivate: [ AuthGuard ], component: ScheduleAdministrationComponent },
  { path: 'storage', canActivate: [ AuthGuard ], component: StorageComponent },
  { path: 'carousel', canActivate: [ AuthGuard ], component: CarouselComponent },
  // User
  { path: 'new-appointment', canActivate: [ AuthGuard ], component: ClientAppointmentsComponent },
  { path: 'my_appointments', canActivate: [ AuthGuard ], component: MyAppointmentComponent },
  { path: 'reservation', canActivate: [ AuthGuard ], component: ClientReservationComponent },
  { path: 'my_reservations', canActivate: [ AuthGuard ], component: ProductReservationComponent },
  // Barber
  { path: 'deliver_product', canActivate: [ AuthGuard ], component: BarberReservationComponent },
  { path: 'my_services', canActivate: [ AuthGuard ], component: BarberServicesComponent },
  { path: 'confirm_appointment', canActivate: [ AuthGuard ], component: BarberAppointmentsComponent },
  { path: 'manage_schedule', canActivate: [ AuthGuard ], component: ProductReservationComponent },

  { path: 'logout', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
