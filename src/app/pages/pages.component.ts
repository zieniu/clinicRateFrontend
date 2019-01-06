import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RoleGuardService } from 'src/_services/role-guard.service';
import { Role } from 'src/_models/users';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  role = Role;
  mode = new FormControl('over');
  hide = true;
  showSubmenuSettings = false;


  constructor(public roleGuardService: RoleGuardService) { }

  ngOnInit() {
  }

}
