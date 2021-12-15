import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../core';

@Component({
  selector: 'app-demo-1',
  template: `
    <div *ngIf="!products?.length">
      Loading data ...
    </div>
    <ul class="list">
      <li
        role="presentation"
        *ngFor="let product of products; trackBy: trackByProduct; let i = index"
      >
        <div class="card">
          <app-card-content
            [name]="product.name"
            [description]="product.description"
          ></app-card-content>
        </div>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Demo1Component {
  @Input() products: Product[];

  trackByProduct(index: number, product: Product): number {
    return product.id;
  }
}
