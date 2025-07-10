import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatSnackBarModule,
    MatSelectModule,
    MatInputModule,
    MatIcon,
    FormsModule
  ]
})
export class ProductModule { }
