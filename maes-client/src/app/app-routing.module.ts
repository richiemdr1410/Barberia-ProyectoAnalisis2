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
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { AppoinmentsPageComponent } from './components/appoinments-page/appoinments-page.component';
import { AdministratorsComponent } from './components/administrators/administrators.component';
import { ProductPageComponent } from './components/products/product-page/product-page.component';
import { ServicePageComponent } from './components/service/service-page/service-page.component';
import { DoubtsComponent } from './components/doubts/doubts.component';
import { ProductReservationsComponent } from './components/products/product-reservations/product-reservations.component';
import { ProductReservationIndexComponent } from './components/products/product-reservations/product-reservation-index/product-reservation-index.component';
import { MyProductReservationComponent } from './components/products/product-reservations/my-product-reservation/my-product-reservation.component';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AccountComponent } from './components/account/account.component';

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
  { path: 'administrators', canActivate: [ AuthGuard ], component: AdministratorsComponent },
  { path: 'appointments', canActivate: [ AuthGuard ], component: AppointmentsComponent },
  { path: 'schedule', canActivate: [ AuthGuard ], component: ScheduleComponent },
  { path: 'reservation', canActivate: [ AuthGuard ], component: ProductReservationsComponent },
  { path: 'all-reservations', canActivate: [ AuthGuard ], component: ProductReservationIndexComponent },
  { path: 'my-reservations', canActivate: [ AuthGuard ], component: MyProductReservationComponent },
  { path: 'my-appointments', canActivate: [ AuthGuard ], component: MyAppointmentsComponent },
  { path: 'carousel', canActivate: [ AuthGuard ], component: CarouselComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'appointments-page', component: AppoinmentsPageComponent },
  { path: 'product-page', component: ProductPageComponent },
  { path: 'service-page', component: ServicePageComponent },
  { path: 'doubts', component: DoubtsComponent },
  { path: 'account', canActivate: [ AuthGuard ], component: AccountComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
