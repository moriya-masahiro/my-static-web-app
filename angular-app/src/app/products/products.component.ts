import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  template: `
    <div class="content-container">
      <app-list-header
        title="Products"
        (refresh)="getProducts()"
      ></app-list-header>
      <div class="columns is-multiline is-variable">
        <div class="column is-8" *ngIf="products$ | async as products">
          <app-product-list [products]="products"></app-product-list>
        </div>
      </div>
      <div class="new field">
        <div class="column is-8" *ngIf="products$ | async as products">
          <app-product-list [products]="products"></app-product-list>
        </div>
      </div>
      <div class="hoge">
        <p>hogehoge</p>
      </div>
      <div>
  `,
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private productService: ProductService) {
    this.products$ = productService.entities$;
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAll();
  }
}
