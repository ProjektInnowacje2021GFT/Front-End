import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: string = "false";
  isLoggedInFlag: boolean = false;
  whoIsLogged: string = "";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn()!;
    if (this.isLoggedIn === 'true') {
      this.isLoggedInFlag = true;
      this.whoIsLogged = this.authService.whoIsLogged()!;
    } else if (this.isLoggedIn === 'false') {
      this.isLoggedInFlag = false;
    }
  }

  async logout() {
    this.authService.logout();
    this.router.navigateByUrl("home");
    await new Promise(f => setTimeout(f, 100));
    window.location.reload();
  }

  getUserRole() {
    return this.authService.getUserRole();
  }

}
