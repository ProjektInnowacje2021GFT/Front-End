import { AddReservationComponent } from './components/add-reservation/add-reservation.component';
import { ReservationDetailsComponent } from './components/reservation-details/reservation-details.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { SuccessfulReservationComponent } from './components/successful-reservation/successful-reservation.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SuccesfulRegistrationComponent } from './components/succesful-registration/succesful-registration.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'successful-registration', component: SuccesfulRegistrationComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'tickets', component: TicketsComponent },
  { path: 'new-reservation', component: AddReservationComponent },
  { path: 'successful-reservation', component: SuccessfulReservationComponent },
  { path: 'reservation-details', component: ReservationDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
