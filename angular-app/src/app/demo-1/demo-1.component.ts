import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Product } from '../core';

@Component({
  selector: 'app-demo-1',
  template: `
    <div class="upload">
        <div>
            <input type="file" accept="image/*" 
                (change)="onChangeFileInput($event)">
        </div>
        <div>
            <img [src]="imgSrc" alt="" width="50%">
        </div>
    </div>
    `,
})
export class Demo1Component implements OnInit {
    file: File = null;
    imgSrc: string | ArrayBuffer = "";
  
    constructor() { }
  
    ngOnInit() {}
  
    onChangeFileInput(event) {
  
      //fileが選択されていなければリセット
      if (event.target.files.length === 0) {
        this.file = null;
        this.imgSrc = "";
        return;
      }
  
      //ファイルの情報をfileとimgSrcに保存
      let reader = new FileReader();
      this.file = event.target.files[0];
      reader.onload = () => {
        this.imgSrc = reader.result;
      }
      reader.readAsDataURL(this.file);
    }
}
