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

  private authServiceHttpUrl: string = "http://localhost:8080/authorization";
  private usersServiceHttpUrl: string = "http://localhost:8080/users";

  constructor(private http: HttpClient) { }

  loginUser(userLoginDto: UserLoginDto): Observable<UserLoginDetailsDto> {
    return this.http.post<UserLoginDetailsDto>(this.authServiceHttpUrl + "/login", userLoginDto);
  }

  registerUser(registerUserDto: RegisterUserDto): Observable<ResponseMessageDto> {
    return this.http.post<ResponseMessageDto>(this.authServiceHttpUrl + "/register", registerUserDto);
  }

  getListOfNewUsersWaitingForApproval(): Observable<WaitingUserDto[]> {
    return this.http.get<WaitingUserDto[]>(this.usersServiceHttpUrl + "/waiting");
  }

  acceptUser(id: number): Observable<ResponseMessageDto> {
    return this.http.patch<ResponseMessageDto>(`${this.usersServiceHttpUrl}/accept/${id}`, {});
  }

  blockUser(id: number): Observable<ResponseMessageDto> {
    return this.http.patch<ResponseMessageDto>(`${this.usersServiceHttpUrl}/block/${id}`, {});
  }

  listAllUsers(): Observable<UserLoginDetailsDto[]> {
    return this.http.get<UserLoginDetailsDto[]>(this.usersServiceHttpUrl + "/approved");
  }

  deleteUser(userId: number): Observable<ResponseMessageDto> {
    return this.http.delete<ResponseMessageDto>(this.usersServiceHttpUrl + "/" + userId);
  }
  
  listUsersWithApprovedStatus(): Observable<UserLoginDetailsDto[]> {
    return this.http.get<UserLoginDetailsDto[]>(this.usersServiceHttpUrl + "/approved");
  }
  
}
