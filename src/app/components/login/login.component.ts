import { UserLoginDetailsDto } from './../../dtos/UserLoginDetailsDto';
import { UserLoginDto } from './../../dtos/UserLoginDto';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoginDto: UserLoginDto = {} as UserLoginDto;
  emailAddress: string = "";
  password: string = "";
  loginResult: UserLoginDetailsDto = {} as UserLoginDetailsDto;

  constructor(private router: Router, private authService: AuthService, private userService: UserService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  async loginUser() {
    this.userLoginDto.email = this.emailAddress;
    this.userLoginDto.password = this.password;
    this.userService.loginUser(this.userLoginDto)
      .subscribe(data => {
        this.loginResult = data;
        this.showSuccessMessage('User logged in successfully.');
        this.authService.saveUserInSessionStorage(data);
        localStorage.setItem("jwtToken", data.jwt);
        this.router.navigateByUrl('dashboard');
      },
      error => this.showErrorMessage(error.error.message));
  }

  showSuccessMessage(message: string) {
    this.toastr.success(message);
  }

  showErrorMessage(message: string) {
    this.toastr.error(message);
  }

}
