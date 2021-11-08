import { ReservationService } from './../../services/reservation.service';
import { ToastrService } from 'ngx-toastr';
import { ReservationDetails } from './../../dtos/ReservationDetails';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css']
})
export class ReservationDetailsComponent implements OnInit {

  reservationDetails: ReservationDetails = {} as ReservationDetails;

  constructor(private activatedRoute: ActivatedRoute, private toastr: ToastrService, private router: Router, private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap
    .pipe(map(() => window.history.state))
    .subscribe(
      data => {
        this.reservationDetails = data;
      }
    )
  }

  deleteReservation(reservationId: number) {
    this.reservationService.deleteReservation(reservationId)
      .subscribe(
        data => {
          this.toastr.success(data.message);
          this.router.navigateByUrl('reservations');
        },
        err => {
          this.toastr.error(err.err.message);
        }
      )
  }

}
