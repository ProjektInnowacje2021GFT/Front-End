import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';
import { UserLoginDetailsDto } from './../../dtos/UserLoginDetailsDto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: UserLoginDetailsDto[] = [] as Array<UserLoginDetailsDto>;
  loggedInUserRole: string = "";

  constructor(private userService: UserService, private toastr: ToastrService, private authService: AuthService) { }

  ngOnInit(): void {
    this.listAllEmployees();
    this.loggedInUserRole = this.authService.getUserRole()!;
  }

  listAllEmployees() {
    return this.userService.listAllUsers()
      .subscribe(
        data => {
          this.employees = data;
        }
      )
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId)
      .subscribe(
        data => {
          this.ngOnInit();
          this.toastr.success(data.message);
        },
        err => {
          this.toastr.error(err.err.message);
        }
      )
  }

  determineUserRole(role: string) {
    if (role === 'ADMIN') {
      return 'Administrator';
    }

    if (role === 'USER') {
      return 'Użytkownik';
    }

    return '';
  }

}
