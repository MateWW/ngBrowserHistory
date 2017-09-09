import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {

  visible = false;

  constructor() { }

  ngOnInit() {
  }

  onHamburgerClick(){
    this.visible = !this.visible;
  }

}
