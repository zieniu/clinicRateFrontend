import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  mode = new FormControl('over');
  hide = true;
  showSubmenuSettings = false;


  constructor() { }

  ngOnInit() {
  }

}
