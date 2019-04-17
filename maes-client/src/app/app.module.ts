import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Material
import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AlertComponent } from './components/alerts/alerts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './components/menu/menu.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ProductsComponent } from './components/products/products.component';
import { ServicesComponent } from './components/service/services.component';
import { StorageComponent } from './components/storage/storage.component';
import { BarbersComponent } from './components/barbers/barbers.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { EditStorageComponent } from './components/storage/edit-storage/edit-storage.component';
import { DeleteStorageComponent } from './components/storage/delete-storage/delete-storage.component';
import { EditBarberComponent } from './components/barbers/edit-barber/edit-barber.component';
import { DeleteBarberComponent } from './components/barbers/delete-barber/delete-barber.component';
import { NumberOnlyDirective } from './directives/number.directive';
import { EditServiceComponent } from './components/service/edit-service/edit-service.component';
import { DeleteServiceComponent } from './components/service/delete-service/delete-service.component';
import { AddServiceComponent } from './components/service/add-service/add-service.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { DeleteProductComponent } from './components/products/delete-product/delete-product.component';
import { AddClientComponent } from './components/clients/add-client/add-client.component';
import { EditClientComponent } from './components/clients/edit-client/edit-client.component';
import { DeleteClientComponent } from './components/clients/delete-client/delete-client.component';
import { AddBarberComponent } from './components/barbers/add-barber/add-barber.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    ProfileComponent,
    MenuComponent,
    ProductsComponent,
    ServicesComponent,
    StorageComponent,
    BarbersComponent,
    ClientsComponent,
    AppointmentsComponent,
    ScheduleComponent,
    EditStorageComponent,
    DeleteStorageComponent,
    AddBarberComponent,
    EditBarberComponent,
    DeleteBarberComponent,
    EditServiceComponent,
    DeleteServiceComponent,
    AddServiceComponent,
    AddProductComponent,
    EditProductComponent,
    DeleteProductComponent,
    AddClientComponent,
    EditClientComponent,
    DeleteClientComponent,
    NumberOnlyDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
  ],
  entryComponents: [
    EditStorageComponent,
    DeleteStorageComponent,
    EditBarberComponent,
    DeleteBarberComponent,
    EditBarberComponent,
    AddBarberComponent,
    EditServiceComponent,
    DeleteServiceComponent,
    AddServiceComponent,
    AddProductComponent,
    EditProductComponent,
    DeleteProductComponent,
    AddClientComponent,
    EditClientComponent,
    DeleteClientComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
