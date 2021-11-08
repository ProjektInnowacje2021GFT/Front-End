import { ResponseMessageDto } from './../dtos/ResponseMessageDto';
import { RegisterUserDto } from './../dtos/RegisterUserDto';
import { UserLoginDetailsDto } from './../dtos/UserLoginDetailsDto';
import { UserLoginDto } from '../dtos/UserLoginDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WaitingUserDto } from '../dtos/WaitingUserDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userServiceHttpUrl: string = "http://localhost:8080/users";

  constructor(private http: HttpClient) { }

  loginUser(userLoginDto: UserLoginDto): Observable<UserLoginDetailsDto> {
    return this.http.post<UserLoginDetailsDto>(this.userServiceHttpUrl + "/login", userLoginDto);
  }

  registerUser(registerUserDto: RegisterUserDto): Observable<ResponseMessageDto> {
    return this.http.post<ResponseMessageDto>(this.userServiceHttpUrl + "/register", registerUserDto);
  }

  getListOfNewUsersWaitingForApproval(): Observable<WaitingUserDto[]> {
    return this.http.get<WaitingUserDto[]>(this.userServiceHttpUrl + "/new-accounts");
  }

  maintainWaitingUser(emailAddress: string, status: string): Observable<ResponseMessageDto> {
    return this.http.put<ResponseMessageDto>(this.userServiceHttpUrl + 
      "/new-accounts/maintenance?emailAddress=" + emailAddress + "&action=" + status, {});
  }

  listAllUsers(): Observable<UserLoginDetailsDto[]> {
    return this.http.get<UserLoginDetailsDto[]>(this.userServiceHttpUrl);
  }

  deleteUser(userId: number): Observable<ResponseMessageDto> {
    return this.http.delete<ResponseMessageDto>(this.userServiceHttpUrl + "/" + userId);
  }
  
}
