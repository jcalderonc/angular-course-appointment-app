import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../services/reservation.service'; // Assuming you have a service to handle reservations
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router'; // Import Router for navigation
import { HomeComponent } from '../home/home.component';
@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HomeComponent],
})
export class ReservationFormComponent implements OnInit {
  
  reservationForm: FormGroup=new FormGroup({});
  
  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute // Inject ActivatedRoute to access route parameters
  ) 
  {
    
  }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id'); // Get the 'id' parameter from the route
    if (id) {
      let reservation=this.reservationService.getReservationById(id);
      if(reservation)
      {
        this.reservationForm.patchValue(reservation);
      }
    }
  }

  onSubmit() { 
    if (this.reservationForm.valid) {
      let reservation: Reservation = this.reservationForm.value;

      let id = this.activatedRoute.snapshot.paramMap.get('id'); // Get the 'id' parameter from the route
    
      if (id) 
      {
        this.reservationService.updateReservation(id, reservation);
      }
      else
      {
        this.reservationService.createReservation(reservation);
      }

      
      this.router.navigate(['/list']); // Navigate to the view reservations page after submission
    } else {
      // Handle form errors
      console.error('Form is invalid');
    }
    
  }
}
