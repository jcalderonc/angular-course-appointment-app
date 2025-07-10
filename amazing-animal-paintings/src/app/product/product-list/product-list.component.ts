import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../../cart/cart.service';
import { Product } from '../../models/product';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filterValue : string = '';
  filteredProducts: Product[] = [];
  orderOptions: any[]=
  [
    { key: 'LowHigh', value: 'Low to High' },
    { key: 'HighLow', value: 'High to Low' },
  ]
  selectedOrder: string = 'LowHigh';

  constructor(private productService: ProductService, private cartService: CartService, private snackBar: MatSnackBar) { 
    // Initialize products array
    this.products = [];
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data =>{
      this.products = data;
      this.filteredProducts=data;
    });
  }

  addToCart(product: Product) {
    console.log("Adding to cart", product); 
    this.cartService.addToCart(product).subscribe({
      next: (response) => {
          this.snackBar.open(`Added ${product.name} to cart!`, 'Close', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
        }
    });
  }

  clearFilter(){
    console.log("Clearing filter");
    this.filterValue = '';
    this.filteredProducts = this.products; // Reset to original products
  }

  applyOrder() {
    console.log("Applying order", this.selectedOrder);
    if (this.selectedOrder === 'LowHigh') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.selectedOrder === 'HighLow') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }

  applyFilter() {
    this.filteredProducts = this.products.filter(product => 
      product.name.toLowerCase().includes(this.filterValue.toLowerCase())
    );
    // Apply ordering after filtering
    this.applyOrder();
  }
  
}
