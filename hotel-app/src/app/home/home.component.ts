import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [RouterModule, ToastComponent],
})
export class HomeComponent {

}
