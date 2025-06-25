import { Component } from '@angular/core';
import { AppointmentListComponent } from "./appointment-list/appointment-list.component";

@Component({
  selector: 'app-root',
  imports: [AppointmentListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-list';
}
