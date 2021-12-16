import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
        <div>
          <button mat-button (click)="onclick()">推論</button>
        </div>
        <div>{{result}}</div>
    </div>
    `,
})
export class Demo1Component implements OnInit {
    file: File = null;
    imgSrc: string | ArrayBuffer = "";
    result = "";
  
    constructor( private http: HttpClient ) { }
  
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

    onclick() {
      if (this.file == null){ return; }

      let data = new FormData();
      data.append('upfile', this.file, this.file.name);

      this.result = "acoustic_guitar";
      

      // ［5］サーバーに送信
      this.http.post('api/classify', data)
        .subscribe(
          data => console.log(data),
          error => console.log(error)
        );


    }
}
