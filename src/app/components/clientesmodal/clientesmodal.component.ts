import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-clientesmodal',
  templateUrl: './clientesmodal.component.html',
  styleUrls: ['./clientesmodal.component.css']
})
export class ClientesmodalComponent implements OnInit {

  constructor(public modalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
