import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import {HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { MenubarComponent } from './component/dashboard/menubar/menubar.component';
import { DashboardComponent } from './component/dashboard/dashboard/dashboard.component';
import { LeftCardComponent } from './component/dashboard/left-card/left-card.component';
import { GridComponent } from './component/dashboard/grid/grid.component';


// services
import { DashboardService } from './component/dashboard/dashboard/dashboard.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MenubarComponent,
    DashboardComponent,
    LeftCardComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,FormsModule,
    AppRoutingModule,
    NgSelectModule,
    HttpClientModule
  ],
  providers: [DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
