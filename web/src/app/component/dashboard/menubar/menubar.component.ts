import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  @Input() menuList;
  @Input() selected
  @Output() onSelected = new EventEmitter()
  constructor() { }

  ngOnInit() {
    this.selected = this.selected || this.menuList[0];
  }

  selectMenu(menu){
    this.selected = menu;
    this.onSelected.emit(menu);
  }
}
