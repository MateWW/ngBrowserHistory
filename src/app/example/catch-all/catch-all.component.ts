import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-catch-all',
  templateUrl: './catch-all.component.html',
  styleUrls: ['./catch-all.component.scss']
})
export class CatchAllComponent implements OnInit {

  routeName: string;

  constructor( route: ActivatedRoute) {
    route.params.subscribe( (param) => {
      this.routeName = param['id'];
    });
  }

  ngOnInit() {
  }

}
