import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  nAnnio: number;

    constructor() {
      this.nAnnio = new Date().getFullYear()
    }
  }
