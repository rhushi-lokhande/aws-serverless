import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { CONST } from './const';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	filter='Today';
	topMenu = CONST.topMenu;
	leftMenu = CONST.leftMenu;
	funnel = CONST.funnel;
	target= CONST.target;
	reps = [];
	saleDetails;
	selectedRep;
	leftCardDetails = [];
	leftSort;
	constructor(private dashboardService: DashboardService) { }

	ngOnInit() {
		this.getData();
	}
	getData(){
		console.log('ddd')
		this.saleDetails= undefined;
		this.selectedRep = undefined;
		this.leftCardDetails = [];
		this.dashboardService.getDetails(this.filter).subscribe(res => {
			this.saleDetails = res;
			this.reps = Object.keys(this.saleDetails.rep);
			this.getLeftCardReps(this.leftSort)
		})
	}
	getLeftCardReps(dir='Top'){
		this.leftCardDetails = [];
		this.reps.sort((a, b) => {
			if (this.saleDetails.rep[a].newMMR < this.saleDetails.rep[b].newMMR)
				return 1;
			if (this.saleDetails.rep[a].newMMR > this.saleDetails.rep[b].newMMR)
				return -1;
			return 0;
		});
		if(dir==='Top'){
			this.reps.slice(0,3).map(r=>{
				let d = this.saleDetails.rep[r];
				d.name = r;
				this.leftCardDetails.push(d)
			})
		}else{
			this.reps.reverse().slice(0,3).map(r=>{
				let d = this.saleDetails.rep[r];
				d.name = r;
				this.leftCardDetails.push(d)
			})
		}
	}
	topMenuClick(menu) {
		this.filter = menu;
		this.getData();
	}
	toLeftMenuClick(menu) {
		this.leftSort = menu;
		this.getLeftCardReps(this.leftSort);
	}
	getDate(time) {
		return new Date(time);
	}
}
