import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { CONST } from './const';

@Injectable({
	providedIn: 'root'
})
export class DashboardService {

	url = 'https://cgg20615tl.execute-api.us-east-1.amazonaws.com/dev/user/';

	constructor(private http: HttpClient) { }


	getDetails(filter) {
		let f = this.getFilterData(filter);
		return Observable.create(observer => {
			this.http.get(this.url + `getSaleData?from=${f.from}&to=${f.to}`).subscribe((res:any) => {
				this.sortData(res.Items,'id');
				this.getFromDashboardData(res);
				observer.next(res);
				observer.complete();
			});
		})
	}

	getFromDashboardData(data) {
		data.funnel = {};
		data.rep = {};
		data.call = 0;
		data.won=0;
		data.Items.map(d => {
			if (!data.funnel[d.status]) {
				data.funnel[d.status] = 1;
			} else {
				data.funnel[d.status]++;
			}

			if (!data.rep[d.Rep]) {
				data.rep[d.Rep] = {
					newMMR: 0,
					newLogos: 0,
					demoCalls: 0
				};
				data.rep[d.Rep].funnel = {};
			}

			if (!data.rep[d.Rep].funnel[d.status]) {
				data.rep[d.Rep].funnel[d.status] = 1
			} else {
				data.rep[d.Rep].funnel[d.status]++;
			}
			data.rep[d.Rep].newMMR += d.MMR;
			data.rep[d.Rep].newLogos += d.Logo;
			if(d.status ==='Contact Made'){
				data.rep[d.Rep].demoCalls++;
				data.call++;
			}
			if(d.status ==='Won'){
				data.won++;
			}

		})

	}



	private sortData(data,sortBy) {
		data.sort((a, b) => {
			if (a[sortBy] < b[sortBy])
				return 1;
			if (a[sortBy] > b[sortBy])
				return -1;
			return 0;
		});
	}


	getFilterData(filter = 'Today') {
		var to = new Date();
		to.setHours(23, 59, 59, 999);

		var start = new Date();


		switch (filter) {
			case 'Today':
				break;
			case 'Last Week':
				start.setDate(start.getDate() - 7);
				break;
			case 'Last Month':
				start.setDate(start.getDate() - 30);
				break;
			case 'This Quarter':
				let quarter = Math.floor((to.getMonth() + 3) / 3) - 1;
				start = new Date(to.getFullYear(), quarter * 3, 1);
				break;
			case 'This Year':
				start = new Date(to.getFullYear(), 0, 1);
				break;
		}
		start.setHours(0, 0, 0, 0);

		return {
			to: to.getTime(),
			from: start.getTime()
		}
	}
}
