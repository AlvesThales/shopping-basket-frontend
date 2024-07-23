import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  receipt: any = null;

  onReceiptGenerated(receipt: any) {
    this.receipt = receipt;
  }

  reset() {
    this.receipt = null;
  }
}