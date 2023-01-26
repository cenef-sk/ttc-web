import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { ContentService } from "src/app/content.service";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-org',
  templateUrl: './create-org.component.html',
  styleUrls: ['./create-org.component.css']
})
export class CreateOrgComponent implements OnInit {

    titleFormControl = new FormControl('', [Validators.required]);
    descriptionFormControl = new FormControl('', []);

    constructor(
      public contentService: ContentService,
      private domSanitizer: DomSanitizer,
      private router: Router,
    ) { }

    ngOnInit() {
    }

    save() {
      this.contentService.addOrg({
        name: this.titleFormControl.value,
        description: this.descriptionFormControl.value
      }).subscribe((org) => {
        window.location.reload();
        this.router.navigate(['/curator']);
      })
    }

    cancel() {
      this.router.navigate(['/curator']);
    }
}
