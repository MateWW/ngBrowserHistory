import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeDetailsComponent } from './home-details/home-details.component';
import {HomeRoutingModule} from './home.routing';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  declarations: [HomeComponent, HomeDetailsComponent]
})
export class HomeModule { }
