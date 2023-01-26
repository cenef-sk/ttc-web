import { Component, OnInit } from '@angular/core';
import { MyslimService } from "src/app/myslim.service";
import { TranslateService } from "@ngx-translate/core";
import { Globals } from "src/app/globals";
import { Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


    oldPasswordFormControl = new FormControl('', [
      Validators.required,
    ]);
    newPasswordFormControl = new FormControl('', [
      Validators.required,
    ]);

    constructor(
      private globals: Globals,
      private myslimService: MyslimService,
      private translate: TranslateService,

    ) { }

    ngOnInit() {
    }

    change() {
      if (this.oldPasswordFormControl.value && this.newPasswordFormControl.value) {
        this.myslimService.updateUser(this.globals.user._id, this.oldPasswordFormControl.value, this.newPasswordFormControl.value).subscribe((data) => {
          if (data.success) {
            alert(this.translate.instant('teacher.profileData.done'))
          } else {
            alert(this.translate.instant('teacher.profileData.wrong'))
          }
        })
      } else {
        alert(this.translate.instant('teacher.profileData.hint1'));
      }

    }

}
