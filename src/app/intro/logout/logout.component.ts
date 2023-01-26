import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { clearLocal } from "src/utils/localStorage";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private globals: Globals,
    private router: Router,
    @Inject('LOCALSTORAGE') public local,
  ) {
    clearLocal(this.local);
    this.globals.token = null;
    this.globals.user = null;
    this.globals.org = null;
  }

  ngOnInit() {
    this.router.navigate(['/']);
  }

}
