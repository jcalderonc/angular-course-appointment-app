import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';
import { MockoonService } from '../services/mockoon.service';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ToastService } from '../services/toast.service';


@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css',
  imports: [CommonModule, RouterModule, HomeComponent ]

})
export class ReservationListComponent implements OnInit {

  reservations: Reservation[] = [];

  constructor( 
    private reservationService : MockoonService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe(reservations => {
      this.reservations = reservations;
      console.log(this.reservations);
    });
    
  }

  deleteReservation(id: string): void {
  this.reservationService.deleteReservation(id).subscribe({
    next: () => {
      // 200-299 status codes (Success)
      this.reservations = this.reservations.filter(res => res.id !== id);
      this.toastService.showSuccess('Reservation deleted successfully!');
    },
    error: (error) => {
      // 400-500+ status codes (Error)
      console.error('Error deleting reservation:', error);
      this.toastService.showError('Failed to delete reservation. Please try again.');
    }
  });
}
}
