export interface CreateNewReservationDto {
    sector: string;
    desk: string;
    floor: number;
    emailAddressOfAPersonThatBelongsToReservation: string;
    date: string;
}