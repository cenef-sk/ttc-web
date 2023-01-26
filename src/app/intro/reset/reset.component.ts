import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { MyslimService } from "src/app/myslim.service";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  constructor(
    private services: MyslimService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  reset () {
    const password = this.passwordFormControl.value;
    this.route.queryParams
      .subscribe(params => {
        let token = params.token;
        console.log(token)
        if (password && token) {
          this.services.reset(token, password).subscribe((data) => {
            if (data.success) {
              alert(this.translate.instant('reset.done'))
              this.router.navigate(['/']);
            } else {
              alert(this.translate.instant('reset.wrongToken'))
            }
          });
        }
      }
    );
  }
}
