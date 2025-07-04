import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockoonService {

  private reservations: Reservation[] = [];
  private apiUrl = 'http://localhost:3001'; // Mockoon API URL

  /**
   *
   */
  constructor(private http: HttpClient) {
    
  }
   // CRUD   
   getReservations(): Observable<Reservation[]> {
     return this.http.get<Reservation[]>(this.apiUrl+ "/reservations");
   }
 
   getReservationById(id: string): Observable<Reservation>  {
     return this.http.get<Reservation>(this.apiUrl+ "/reservation/" + id);
   }
 
   createReservation(reservation: Reservation): Observable<void> {
    return this.http.post<void>(this.apiUrl + "/reservation", reservation);
 
   }
 
   deleteReservation(id: string): Observable<void> {
      return this.http.delete<void>(this.apiUrl + "/reservation/" + id);

   }
 
   updateReservation(id: string,updatedReservation: Reservation): Observable<void> {
     return this.http.put<void>(this.apiUrl + "/reservation/"+ id, updatedReservation);
   }
}
