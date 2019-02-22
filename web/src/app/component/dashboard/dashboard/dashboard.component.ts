import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	topMenu = ['Today', 'Last Week', 'Last Month', 'This Quarter', 'This Year']
	leftMenu = ['Top', 'Bottom']
	items = [ {id: 1, name: 'New item'}, {id: 1, name: 'New item'}, {id: 1, name: 'New item'}];
	leftCardDetails = [
		{
			name: 'John dev',
			newMMR: 1320,
			newLogos: 125,
			demoCalls: 20
		},
		{
			name: 'John dev',
			newMMR: 1320,
			newLogos: 125,
			demoCalls: 20
		},
		{
			name: 'John dev',
			newMMR: 1320,
			newLogos: 125,
			demoCalls: 20
		}
	]
	constructor() { }

	ngOnInit() {
	}
	toMenuClick(menu) {
		console.log(menu);
	}
	toLeftMenuClick(menu) {
		console.log(menu);
	}
}
