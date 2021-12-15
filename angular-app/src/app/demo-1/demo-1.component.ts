import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../core';

@Component({
  selector: 'app-demo-1',
  template: `
    <!--イベントハンドラーを登録-->
    <input type="button" value="現在時刻" (click)="onclick()" />
    <div>{{result}}</div>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Demo1Component {
  @Input() products: Product[];

  trackByProduct(index: number, product: Product): number {
    return product.id;
  }

   // 変数resultを初期化
   result = '現在時刻は不明です。';

   // ボタンクリック時に現在時刻を表示
   onclick() {
     this.result = `現在時刻は、${new Date().toLocaleTimeString()}です。`;
   }
}
