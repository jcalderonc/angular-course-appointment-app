import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../product';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {
  products = input.required<Product[]>();

  filteredProducts = computed(() => {
    return this.products().filter(product => product.price > 15);
  });
}
