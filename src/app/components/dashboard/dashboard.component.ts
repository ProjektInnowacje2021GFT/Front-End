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
  qrCode: any;

  constructor(private router: Router, private authService: AuthService, private reservationService: ReservationService,
    private toastr: ToastrService) { 
  }

  ngOnInit(): void {
    setTimeout(() => {}, 3000);
    if (this.authService.isFreshlyLoggedIn()) {
      window.location.reload();
    }
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.qrCode = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }


  redirectToReservations() {
    this.router.navigateByUrl("reservations");
  }

  redirectToNewReservation() {
    this.router.navigateByUrl("pick-up-date-and-floor");
  }

}
