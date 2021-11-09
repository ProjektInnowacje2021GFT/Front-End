import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DatepickerOptions } from 'ng2-datepicker';
import { ReservationService } from 'src/app/services/reservation.service';
import { DeskDetailsDto } from 'src/app/dtos/DeskDetailsDto';
import { DateAndFloorDto } from 'src/app/dtos/DateAndFloorDto';

@Component({
  selector: 'app-pick-up-date-and-floor',
  templateUrl: './pick-up-date-and-floor.component.html',
  styleUrls: ['./pick-up-date-and-floor.component.css']
})
export class PickUpDateAndFloorComponent implements OnInit {

  chosenFloor: number = 0;
  availableDesks: DeskDetailsDto[] = {} as Array<DeskDetailsDto>
  availableSectors: string[] = {} as Array<string>
  availableDeskNumbers: string[] = {} as Array<string>
  date: Date = new Date();
  options: DatepickerOptions = {
    format: 'LLLL do yyyy'
  }
  chosenParameters: DateAndFloorDto = {} as DateAndFloorDto;

  constructor(private reservationService: ReservationService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  chooseFloor(floor: number) {
    this.chosenFloor = floor;
  }

  goToNextStep() {
    if (this.chosenFloor === 0) {
      this.toastr.error('Floor has not been chosen.');
      return;
    }

    this.chosenParameters = {
      date: this.date,
      floor: this.chosenFloor
    };
    this.router.navigateByUrl('new-reservation', { state: this.chosenParameters});
  }

}
