import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {

  searchForm = new FormGroup({
    search: new FormControl(),
    segmentId: new FormControl(),
    save: new FormControl(),
    filterById: new FormControl(),
    filterByIdSection: new FormControl()
  });

  visible = false;

  constructor() { }

  ngOnInit() {
    console.log(this.searchForm);
  }

  onHamburgerClick(){
    this.visible = !this.visible;
  }

}
