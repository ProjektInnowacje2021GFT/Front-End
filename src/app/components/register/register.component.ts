import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';
import { RegisterUserDto } from './../../dtos/RegisterUserDto';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserDto: RegisterUserDto = {} as RegisterUserDto;
  name: string = "";
  surname: string = "";
  company: string = "GFT Polska";
  emailAddress: string = "";
  password: string = "";
  role: string = "USER";

  constructor(private router: Router, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  registerUser() {
    this.registerUserDto.name = this.name;
    this.registerUserDto.surname = this.surname;
    this.registerUserDto.company = this.company;
    this.registerUserDto.email = this.emailAddress;
    this.registerUserDto.password = this.password;
    this.registerUserDto.role = this.role;
    this.userService.registerUser(this.registerUserDto)
      .subscribe(
        data => {
          this.showSuccessMessage(data.message);
          this.router.navigateByUrl('successful-registration');
        },
        error => {
          this.showErrorMessage(error.error.message)
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
