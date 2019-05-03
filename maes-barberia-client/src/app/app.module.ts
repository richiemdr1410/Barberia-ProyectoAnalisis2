import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterialFileInputModule } from 'ngx-material-file-input';
import {SlideshowModule} from 'ng-simple-slideshow';

// Material
import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AlertComponent } from './shared/alert/alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { ServicesComponent } from './components/services/services.component';
import { ProductsComponent } from './components/products/products.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DoubtsComponent } from './components/doubts/doubts.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './shared/menu/menu.component';
import { NumberOnlyDirective } from './directives/number.directive';
import { AddProductComponent } from './components/product-administration/add-product/add-product.component';
import { EditProductComponent } from './components/product-administration/edit-product/edit-product.component';
import { DeleteProductComponent } from './components/product-administration/delete-product/delete-product.component';
import { AddAdministratorComponent } from './components/user-administration/administrators/add-administrator/add-administrator.component';
import { EditAdministratorComponent } from './components/user-administration/administrators/edit-administrator/edit-administrator.component';
import { DeleteAdministratorComponent } from './components/user-administration/administrators/delete-administrator/delete-administrator.component';
import { AdministratorsComponent } from './components/user-administration/administrators/administrators.component';
import { AddBarberComponent } from './components/user-administration/barbers/add-barber/add-barber.component';
import { EditBarberComponent } from './components/user-administration/barbers/edit-barber/edit-barber.component';
import { DeleteBarberComponent } from './components/user-administration/barbers/delete-barber/delete-barber.component';
import { BarbersComponent } from './components/user-administration/barbers/barbers.component';
import { AddClientComponent } from './components/user-administration/clients/add-client/add-client.component';
import { EditClientComponent } from './components/user-administration/clients/edit-client/edit-client.component';
import { DeleteClientComponent } from './components/user-administration/clients/delete-client/delete-client.component';
import { ClientsComponent } from './components/user-administration/clients/clients.component';
import { ProductAdministrationComponent } from './components/product-administration/product-administration.component';
import { ServiceAdministrationComponent } from './components/service-administration/service-administration.component';
import { AddServiceComponent } from './components/service-administration/add-service/add-service.component';
import { EditServiceComponent } from './components/service-administration/edit-service/edit-service.component';
import { DeleteServiceComponent } from './components/service-administration/delete-service/delete-service.component';
import { AccountComponent } from './components/account/account.component';
import { ScheduleAdministrationComponent } from './components/schedule-administration/schedule-administration.component';
import { DeleteStorageComponent } from './components/storage/delete-storage/delete-storage.component';
import { EditStorageComponent } from './components/storage/edit-storage/edit-storage.component';
import { StorageComponent } from './components/storage/storage.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AddCarouselComponent } from './components/carousel/add-carousel/add-carousel.component';
import { EditCarouselComponent } from './components/carousel/edit-carousel/edit-carousel.component';
import { DeleteCarouselComponent } from './components/carousel/delete-carousel/delete-carousel.component';
import { AppointmentConfirmationComponent } from './components/appointment-confirmation/appointment-confirmation.component';
import { ClientAppointmentsComponent } from './components/client-appointments/client-appointments.component';
import { MyAppointmentComponent } from './components/my-appointment/my-appointment.component';
import { ProductReservationComponent } from './components/product-reservation/product-reservation.component';
import { EditProductReservationComponent } from './components/product-reservation/edit-product-reservation/edit-product-reservation.component';
import { ClientReservationComponent } from './components/client-reservation/client-reservation.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AskAppointmentComponent } from './components/client-appointments/ask-appointment/ask-appointment.component';
import { AddProductReservationComponent } from './components/client-reservation/add-product-reservation/add-product-reservation.component';
import { DeleteProductReservationComponent } from './components/product-reservation/delete-product-reservation/delete-product-reservation.component';
import { DeleteAppointmentComponent } from './components/my-appointment/delete-appointment/delete-appointment.component';
import { BarberReservationComponent } from './components/barber-reservation/barber-reservation.component';
import { BarberServicesComponent } from './components/barber-services/barber-services.component';
import { BarberDeliverReservationComponent } from './components/barber-reservation/barber-deliver-reservation/barber-deliver-reservation.component';
import { BarberAppointmentsComponent } from './components/barber-appointments/barber-appointments.component';
import { BarberConfirmAppointmentComponent } from './components/barber-appointments/barber-confirm-appointment/barber-confirm-appointment.component';


@NgModule({
  declarations: [
    AppComponent,
    NumberOnlyDirective,
    MenuComponent,
    AlertComponent,
    HomeComponent,
    AboutUsComponent,
    AppointmentsComponent,
    ServicesComponent,
    ProductsComponent,
    ContactUsComponent,
    DoubtsComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AccountComponent,
    AddProductComponent,
    EditProductComponent,
    DeleteProductComponent,
    AdministratorsComponent,
    AddAdministratorComponent,
    EditAdministratorComponent,
    DeleteAdministratorComponent,
    BarbersComponent,
    AddBarberComponent,
    EditBarberComponent,
    DeleteBarberComponent,
    ClientsComponent,
    AddClientComponent,
    EditClientComponent,
    DeleteClientComponent,
    ProductAdministrationComponent,
    ServiceAdministrationComponent,
    AddServiceComponent,
    EditServiceComponent,
    DeleteServiceComponent,
    ScheduleAdministrationComponent,
    StorageComponent,
    EditStorageComponent,
    DeleteStorageComponent,
    CarouselComponent,
    AddCarouselComponent,
    EditCarouselComponent,
    DeleteCarouselComponent,
    AppointmentConfirmationComponent,
    ClientAppointmentsComponent,
    MyAppointmentComponent,
    ClientReservationComponent,
    ProductReservationComponent,
    EditProductReservationComponent,
    DeleteProductComponent,
    LogoutComponent,
    AddProductReservationComponent,
    AskAppointmentComponent,
    DeleteProductReservationComponent,
    DeleteAppointmentComponent,
    BarberDeliverReservationComponent,
    BarberReservationComponent,
    BarberServicesComponent,
    BarberAppointmentsComponent,
    BarberConfirmAppointmentComponent
  ],
  entryComponents: [
    AddProductComponent,
    EditProductComponent,
    DeleteProductComponent,
    AddAdministratorComponent,
    EditAdministratorComponent,
    DeleteAdministratorComponent,
    AddBarberComponent,
    EditBarberComponent,
    DeleteBarberComponent,
    AddClientComponent,
    EditClientComponent,
    DeleteClientComponent,
    AddServiceComponent,
    EditServiceComponent,
    DeleteServiceComponent,
    EditStorageComponent,
    DeleteStorageComponent,
    AddCarouselComponent,
    EditCarouselComponent,
    DeleteCarouselComponent,
    AppointmentConfirmationComponent,
    EditProductReservationComponent,
    DeleteProductComponent,
    AddProductReservationComponent,
    AskAppointmentComponent,
    DeleteProductReservationComponent,
    DeleteAppointmentComponent,
    BarberDeliverReservationComponent,
    BarberConfirmAppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialFileInputModule,
    SlideshowModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
