import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';
import { WaitingUserDto } from './../../dtos/WaitingUserDto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  waitingUserDtos: WaitingUserDto[] = [] as Array<WaitingUserDto>;

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListOfNewUsersWaitingForApproval();
  }

  getListOfNewUsersWaitingForApproval() {
    this.userService.getListOfNewUsersWaitingForApproval()
      .subscribe(
        data => {
          this.waitingUserDtos = data.map(item => item);
        }
      );
  }

  determineUserStatus(status: string) {
    if (status === 'WAIT_FOR_APPROVAL') {
      return 'Oczekujący';
    }

    return '';
  }

  acceptUser(id: number) {
    this.userService.acceptUser(id)
      .subscribe(
        data => {
          this.ngOnInit();
          this.showSuccessMessage(data.message);
        },
        error => {
          this.showErrorMessage(error.error.message);
        }
      );
  }

  declineUser(id: number) {
    this.userService.blockUser(id)
      .subscribe(
        data => {
          this.ngOnInit();
          this.showSuccessMessage(data.message);
        },
        error => {
          this.showErrorMessage(error.error.message);
        }
      )
  }


  showSuccessMessage(message: string) {
    this.toastr.success(message);
  }

  showErrorMessage(message: string) {
    this.toastr.error(message);
  }

}
