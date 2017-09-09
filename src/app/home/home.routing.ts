import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {HomeDetailsComponent} from './home-details/home-details.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: ':id', component: HomeDetailsComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports:[
    RouterModule
  ]
})
export class HomeRoutingModule {
}
