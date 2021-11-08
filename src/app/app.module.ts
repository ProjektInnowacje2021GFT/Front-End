import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { SuccesfulRegistrationComponent } from './components/succesful-registration/succesful-registration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { AddReservationComponent } from './components/add-reservation/add-reservation.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import {DpDatePickerModule} from 'ng2-date-picker'; 
import { NgSelectModule } from '@ng-select/ng-select';
import { DatepickerModule } from 'ng2-datepicker';
import { SuccessfulReservationComponent } from './components/successful-reservation/successful-reservation.component';
import { ReservationDetailsComponent } from './components/reservation-details/reservation-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    SuccesfulRegistrationComponent,
    DashboardComponent,
    EmployeesComponent,
    ReservationsComponent,
    TicketsComponent,
    AddReservationComponent,
    SuccessfulReservationComponent,
    ReservationDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgSelectModule,
    DpDatePickerModule,
    DatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
