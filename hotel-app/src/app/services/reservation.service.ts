import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
private reservations: Reservation[] = [];
  constructor() {
    // Load reservations from localStorage if available
    const storedReservations = localStorage.getItem('reservations');
    this.reservations = storedReservations?JSON.parse(storedReservations): [];
  }
  // CRUD   
  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservationById(id: string): Reservation | undefined {
    return this.reservations.find(res => res.id === id);
  }

  createReservation(reservation: Reservation): void {
    reservation.id = new Date().getTime().toString(); // Generate a unique ID based on timestamp
    this.reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));  
  }

  deleteReservation(id: string): void {
    let index= this.reservations.findIndex(res => res.id === id);
    this.reservations.splice(index, 1);
    localStorage.setItem('reservations', JSON.stringify(this.reservations)); 
  }

  updateReservation(id: string, updatedReservation: Reservation): void {
    let index = this.reservations.findIndex(res => res.id === id);
    if (index !== -1) {
      this.reservations[index] = { ...this.reservations[index], ...updatedReservation };
    }
    localStorage.setItem('reservations', JSON.stringify(this.reservations)); 
  }

  
}
