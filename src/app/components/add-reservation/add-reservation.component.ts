import { DateAndFloorDto } from './../../dtos/DateAndFloorDto';
import { Router, ActivatedRoute } from '@angular/router';
import { CreateNewReservationDto } from './../../dtos/CreateNewReservationDto';
import { ToastrService } from 'ngx-toastr';
import { DeskDetailsDto } from './../../dtos/DeskDetailsDto';
import { ReservationService } from './../../services/reservation.service';
import { UserLoginDetailsDto } from './../../dtos/UserLoginDetailsDto';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {

  chosenSector: string = "";
  chosenDesk: string = "";
  emailAddressForPersonWhoWillGetReservation: string = "";
  employees: UserLoginDetailsDto[] = {} as Array<UserLoginDetailsDto>
  availableDesks: DeskDetailsDto[] = {} as Array<DeskDetailsDto>
  availableSectors: string[] = {} as Array<string>
  availableDeskNumbers: number[] = {} as Array<number>
  chosenParameters: DateAndFloorDto = {} as DateAndFloorDto;

  constructor(private UserService: UserService, private reservationService: ReservationService, private toastr: ToastrService,
      private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getAllEmployees();
    this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))
      .subscribe(
        data => {
          this.chosenParameters = data;
        }
      )
      this.specifyAvailableDesks();
  }

  getAllEmployees() {
    this.UserService.listUsersWithApprovedStatus()
      .subscribe(
        data => {
          console.log(data);
          this.employees = data;
        }
    );
  }

  specifyAvailableDesks() {
    this.reservationService.getAvailableDesksOnSpecificFloor(
      this.chosenParameters.floor, 
      this.chosenParameters.date)
      .subscribe(
        data => {
          this.availableDesks = data;
          var uniqueSectors = [... new Set(data.map(desk => desk.sector))];
          var uniqueDeskNumbers = [... new Set(data.map(desk => desk.number))]
          this.availableSectors = Array.from(uniqueSectors.values());
          this.availableDeskNumbers = Array.from(uniqueDeskNumbers.values());
        }
    )
  }

  createReservation() {
    var numberOfErrors = 0;
    if (this.chosenSector === "") {
      this.toastr.error('Sector has not been chosen.');
      numberOfErrors++;
    }
    if (this.chosenDesk === "") {
      this.toastr.error('Desk has not been chosen.');
      numberOfErrors++;
    }
    if (this.emailAddressForPersonWhoWillGetReservation === "") {
      this.toastr.error('Person has not been chosen.');
      numberOfErrors++;
    }
    if (numberOfErrors !== 0) {
      return;
    }

    var createNewReservationRequest: CreateNewReservationDto = {
      deskNumber: this.chosenDesk,
      sector: this.chosenSector,
      floor: this.chosenParameters.floor,
      reservationDate: this.chosenParameters.date.toISOString().split('T').join(' '),
      email: this.emailAddressForPersonWhoWillGetReservation
    };

    this.reservationService.createReservation(createNewReservationRequest)
      .subscribe(
        data => {
          this.toastr.success('You have successfully reserved desk');
          this.router.navigateByUrl('/successful-reservation');
        },
        err => {
          console.log(err);
          this.toastr.error('Reservation actually exists.');
        }
      )
  }

}
