import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { signal,effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from './product';
import { ProductList } from './product-list/product-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ProductList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

  export class App implements OnInit {
  
  protected title = 'agular-signals-example';
  protected theme = signal('light');
  protected price = 19;
  protected quantity = signal(10);
  protected total = computed(() => this.price * this.quantity());
  protected label = this.theme();

   protected products= signal([
    new Product(1, 'Product 1', 10),
    new Product(2, 'Product 2', 20),
    new Product(3, 'Product 3', 30)]);
  

    protected childProducts = [
      { id: 1, name: 'Child Product 1', price: 5 },
      { id: 2, name: 'Child Product 2', price: 15 },
      { id: 3, name: 'Child Product 3', price: 25 }
    ]
  constructor() {
    effect(() => {
      this.label = this.theme();
    });
  }

  ngOnInit() {
    //this.theme.set('dark');
    //document.body.className = this.theme();
  }

  protected filterName = signal('');

  protected filteredProducts = computed(() => {
    return this.products().filter(
      product => product.name
      .toLowerCase()
      .includes(this.filterName().toLowerCase()));
  });

  changeFilter(event: any) {
      const value = event.target.value;
      this.filterName.set(value);
    }

  changeQuantity(event: any) {
    const value = event.target.value;
    if (!isNaN(value) && value >= 0) {
      this.quantity.set(Number(value));
    } else {
      this.quantity.set(0);
    }
  }

  toggleTheme() {
    this.theme.update(value => value === 'light' ? 'dark' : 'light');
    document.body.className = this.theme();
  }
}

