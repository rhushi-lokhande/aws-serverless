import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-left-card',
  templateUrl: './left-card.component.html',
  styleUrls: ['./left-card.component.css']
})
export class LeftCardComponent implements OnInit {

  @Input() leftCardDetails;

  constructor() { }

  ngOnInit() {
  }
}
