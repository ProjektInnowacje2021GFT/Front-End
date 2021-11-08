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
          this.waitingUserDtos = data;
        }
      );
  }

  determineUserStatus(status: string) {
    if (status === 'WAITING') {
      return 'Oczekujący';
    }

    return '';
  }

  acceptUser(emailAddress: string) {
    this.userService.maintainWaitingUser(emailAddress, "APPROVED")
      .subscribe(
        data => {
          this.showSuccessMessage(data.message);
          window.location.reload();
        },
        error => {
          this.showErrorMessage(error.error.message);
        }
      )
  }

  declineUser(emailAddress: string) {
    this.userService.maintainWaitingUser(emailAddress, "BLOCKED")
      .subscribe(
        data => {
          this.showSuccessMessage(data.message);
          window.location.reload();
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
