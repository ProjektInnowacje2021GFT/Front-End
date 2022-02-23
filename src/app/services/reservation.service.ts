import { ReservationDetails } from './../dtos/ReservationDetails';
import { CreateNewReservationDto } from './../dtos/CreateNewReservationDto';
import { DeskDetailsDto } from './../dtos/DeskDetailsDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseMessageDto } from '../dtos/ResponseMessageDto';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservationHttpUrl: string = "http://localhost:8080/reservations";
  private deskHttpUrl: string = "http://localhost:8080/desks";


  constructor(private httpClient: HttpClient) { }

  createReservation(createReservationRequest: CreateNewReservationDto): Observable<ResponseMessageDto> {
    return this.httpClient.post<ResponseMessageDto>(this.reservationHttpUrl + "/", createReservationRequest);
  }

  getAvailableDesksOnSpecificFloor(floor: number, todayDate: Date): Observable<DeskDetailsDto[]> {
    return this.httpClient.get<DeskDetailsDto[]>(this.deskHttpUrl + "/floor/" + floor + "/date/" + todayDate);
  }

  getLatestReservationForSpecificUser(emailAddress: string): Observable<ReservationDetails> {
    return this.httpClient.get<ReservationDetails>(this.reservationHttpUrl + "/latest?emailAddress=" + emailAddress);
  }

  deleteReservation(reservationId: number): Observable<ResponseMessageDto> {
    return this.httpClient.delete<ResponseMessageDto>(this.reservationHttpUrl + "/" + reservationId);
  }

  getReservationsForSpecificUser(userId: number): Observable<ReservationDetails[]> {
    return this.httpClient.get<ReservationDetails[]>(this.reservationHttpUrl + "/" + userId);
  }

  generateQrCodeForSpecificReservation(reservationId: number): Observable<Blob> {
    return this.httpClient.get(this.reservationHttpUrl + "/qr/" + reservationId, { responseType: 'blob' });
  }

}
