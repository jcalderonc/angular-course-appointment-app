import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../services/reservation.service';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css',
  imports: [CommonModule, RouterModule, HomeComponent]

})
export class ReservationListComponent implements OnInit {

  reservations: Reservation[] = [];

  constructor( private reservationService : ReservationService) { }

  ngOnInit(): void {
    this.reservations = this.reservationService.getReservations();
  }

  deleteReservation(id: string):void {
    this.reservationService.deleteReservation(id); 
  }
}
