import { Component, OnInit } from '@angular/core';
import { MyslimService } from "src/app/myslim.service";
import { Router } from "@angular/router";
import { Validators, FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    private router: Router,
    private services: MyslimService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
  }

  forgot () {
    const email = this.emailFormControl.value;
    if (email) {
      this.services.forgot(email, this.translate.currentLang).subscribe(() => {
        alert(this.translate.instant('forgot.sent'))
        this.router.navigate(['/']);
      }
    );
    }
  }

}
