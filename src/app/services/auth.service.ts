import { UserLoginDetailsDto } from './../dtos/UserLoginDetailsDto';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  numberOfDashboardAccesses: number = 0;

  constructor() { }

  saveUserInSessionStorage(userLoginDetails: UserLoginDetailsDto) {
    this.numberOfDashboardAccesses++;
    sessionStorage.setItem("emailAddress", userLoginDetails.email);
    sessionStorage.setItem("company", userLoginDetails.companyName);
    sessionStorage.setItem("name", userLoginDetails.firstName);
    sessionStorage.setItem("surname", userLoginDetails.lastName);
    sessionStorage.setItem("userId", userLoginDetails.id.toString());
    sessionStorage.setItem("role", userLoginDetails.role);
    sessionStorage.setItem("isLoggedIn", "true");
  }

  getUserRole() {
    return sessionStorage.getItem("role");
  }

  getUserId() {
    return sessionStorage.getItem("userId");
  }

  isFreshlyLoggedIn() {
    if (this.numberOfDashboardAccesses === 0) {
      return false;
    } else {
      return true;
    }
  }

  isLoggedIn() {
    return sessionStorage.getItem("isLoggedIn");
  }

  logout() {
    sessionStorage.clear();
  }

  whoIsLogged() {
    return sessionStorage.getItem("emailAddress");
  }

}
