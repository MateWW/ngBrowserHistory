import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExampleComponent} from './example.component';
import {TestComponent} from './test/test.component';
import {ExampleRoutingModule} from './example.routing';
import { CatchAllComponent } from './catch-all/catch-all.component';

@NgModule({
  imports: [
    CommonModule,
    ExampleRoutingModule
  ],
  declarations: [ExampleComponent, TestComponent, CatchAllComponent]
})
export class ExampleModule {
}
