import { Router } from '@angular/router';
import { CreateNewReservationDto } from './../../dtos/CreateNewReservationDto';
import { ToastrService } from 'ngx-toastr';
import { DeskDetailsDto } from './../../dtos/DeskDetailsDto';
import { ReservationService } from './../../services/reservation.service';
import { UserLoginDetailsDto } from './../../dtos/UserLoginDetailsDto';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {

  chosenFloor: number = 0;
  chosenSector: string = "";
  chosenDesk: string = "";
  emailAddressForPersonWhoWillGetReservation: string = "";
  employees: UserLoginDetailsDto[] = {} as Array<UserLoginDetailsDto>
  availableDesks: DeskDetailsDto[] = {} as Array<DeskDetailsDto>
  availableSectors: string[] = {} as Array<string>
  availableDeskNumbers: string[] = {} as Array<string>
  date: Date = new Date();
  options: DatepickerOptions = {
    format: 'LLLL do yyyy'
  }

  constructor(private UserService: UserService, private reservationService: ReservationService, private toastr: ToastrService,
      private router: Router) {
  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.UserService.listAllUsers()
      .subscribe(
        data => {
          this.employees = data;
        }
    );
  }

  chooseFloor(floor: number) {
    this.chosenFloor = floor;
    var todayDate = new Date();
    console.log(todayDate);
    console.log(todayDate.toISOString().split('T')[0])
    this.reservationService.getAvailableDesksOnSpecificFloor(floor, todayDate.toISOString().split('T')[0])
      .subscribe(
        data => {
          this.availableDesks = data;
          var uniqueSectors = [... new Set(data.map(desk => desk.sector))];
          var uniqueDeskNumbers = [... new Set(data.map(desk => desk.desk))]
          this.availableSectors = Array.from(uniqueSectors.values());
          this.availableDeskNumbers = Array.from(uniqueDeskNumbers.values());
        }
    )
  }

  createReservation() {
    var numberOfErrors = 0;
    if (this.chosenFloor === 0) {
      this.toastr.error('Floor has not been chosen.'); 
      numberOfErrors++;
    }
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
      desk: this.chosenDesk,
      sector: this.chosenSector,
      floor: this.chosenFloor,
      date: this.date.toISOString().split('T')[0],
      emailAddressOfAPersonThatBelongsToReservation: this.emailAddressForPersonWhoWillGetReservation
    };

    this.reservationService.createReservation(createNewReservationRequest)
      .subscribe(
        data => {
          this.toastr.success('You have successfully reserved ' + data.desk + ' ' + data.sector + ' on floor ' + data.floor
           + ' for ' + data.emailAddressOfAPersonThatBelongsToReservation + '!');
          this.router.navigateByUrl('/successful-reservation');
        },
        err => {
          this.toastr.error('Reservation actually exists.');
        }
      )
  }

}
