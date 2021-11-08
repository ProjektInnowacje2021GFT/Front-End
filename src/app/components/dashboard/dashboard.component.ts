import { ToastrService } from 'ngx-toastr';
import { ReservationService } from './../../services/reservation.service';
import { ReservationDetails } from './../../dtos/ReservationDetails';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userHasAnyReservation: boolean = true;
  latestReservationDate: string = "";
  latestReservationPlace: string = "";
  latestReservationDetails: ReservationDetails = {} as ReservationDetails;

  constructor(private router: Router, private authService: AuthService, private reservationService: ReservationService,
    private toastr: ToastrService) { 
  }

  ngOnInit(): void {
    this.getLatestReservationDetails();
    if (this.authService.isFreshlyLoggedIn()) {
      window.location.reload();
    }
  }

  getLatestReservationDetails() {
    var emailAddress = this.authService.whoIsLogged()!;
    this.reservationService.getLatestReservationForSpecificUser(emailAddress)
      .subscribe(
        data => {
          this.latestReservationDetails = {
            reservationId: data.reservationId,
            sector: data.sector,
            desk: data.desk,
            floor: data.floor,
            emailAddressOfAPersonThatBelongsToReservation: data.emailAddressOfAPersonThatBelongsToReservation,
            reservationDate: data.reservationDate
          }
        },
        err => {
          this.userHasAnyReservation = false;
        }
      )
  }

  deleteReservation() {
    this.reservationService.deleteReservation(this.latestReservationDetails.reservationId)
      .subscribe(
        data => {
          this.toastr.success(data.message);
          window.location.reload();
        },
        err => {
          this.toastr.error(err.err.message);
        }
      )
  }

  redirectToReservations() {
    this.router.navigateByUrl("reservations");
  }

  redirectToNewReservation() {
    this.router.navigateByUrl("new-reservation");
  }

}
