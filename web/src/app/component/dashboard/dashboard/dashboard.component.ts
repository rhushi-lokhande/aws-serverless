import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { CONST } from './const';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	filter = 'Today';
	topMenu = CONST.topMenu;
	leftMenu = CONST.leftMenu;
	funnel = CONST.funnel;
	target = CONST.target;
	reps = [];
	saleDetails;
	selectedRep;
	leftCardDetails = [];
	leftSort;
	constructor(private dashboardService: DashboardService) { }

	ngOnInit() {
		this.getData();
		this.getResp();
		this.getLeftPanelData()
	}
	getResp() {
		this.dashboardService.getResp().subscribe((res: any) => {
			this.reps = [{ rep: 'All' }, ...res.Items];
		})
	}
	getData() {
		this.saleDetails = undefined;
		this.dashboardService.getDetails(this.filter, this.selectedRep || 'All').subscribe(res => {
			this.saleDetails = res;
		})
	}
	getLeftPanelData() {
		this.leftCardDetails = [];
		this.dashboardService.getLeftPanelData(this.filter, this.leftSort).subscribe((res: any) => {
			this.leftCardDetails = res.data;
		})
	}
	topMenuClick(menu) {
		this.filter = menu;
		this.getData();
		this.getLeftPanelData();
	}
	toLeftMenuClick(menu) {
		this.leftSort = menu;
		this.getLeftPanelData();
	}
	getDate(time) {
		return new Date(time);
	}
}
