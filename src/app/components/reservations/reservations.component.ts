import { Router } from '@angular/router';
import { ReservationService } from './../../services/reservation.service';
import { AuthService } from './../../services/auth.service';
import { ReservationDetails } from './../../dtos/ReservationDetails';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  reservations: ReservationDetails[] = {} as Array<ReservationDetails>

  constructor(private authService: AuthService, private reservationService: ReservationService, private router: Router) { }

  ngOnInit(): void {
    this.getReservationsForSpecificUser();
  }

  getReservationsForSpecificUser() {
    var userId = this.authService.getUserId()!;
    this.reservationService.getReservationsForSpecificUser(+userId)
      .subscribe(
        data => {
          this.reservations = data;
        }
    )
  }

  openReservationDetails(reservation: ReservationDetails) {
    this.router.navigateByUrl('reservation-details', { state: reservation });
  }

}
