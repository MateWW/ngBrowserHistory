import {NgModule} from '@angular/core';
import {ExampleComponent} from './example.component';
import {RouterModule, Routes} from '@angular/router';
import {TestComponent} from './test/test.component';
import {CatchAllComponent} from './catch-all/catch-all.component';

const routes: Routes = [
  {path: '', component: ExampleComponent, children: [
    {path: 'test', component: TestComponent},
    {path: ':id', component: CatchAllComponent},
    {path: '**', component: CatchAllComponent}
  ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ExampleRoutingModule {
}
