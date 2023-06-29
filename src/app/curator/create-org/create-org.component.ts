import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { ContentService } from "src/app/content.service";
import { DomSanitizer } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-create-org',
  templateUrl: './create-org.component.html',
  styleUrls: ['./create-org.component.css']
})
export class CreateOrgComponent implements OnInit {

    orgId = null
    titleFormControl = new FormControl('', [Validators.required]);
    descriptionFormControl = new FormControl('', []);

    constructor(
      public contentService: ContentService,
      private domSanitizer: DomSanitizer,
      private route: ActivatedRoute,
      private router: Router,
    ) { }

    ngOnInit() {
      const snapshot = this.route.snapshot;
      if(snapshot.params.id) {
        this.loadOrg(snapshot.params.id);
      }
    }

    loadOrg(orgId: string) {
      this.contentService.getOrg(orgId)
      .subscribe((org) => {
        console.log(org)

        this.orgId = org._id
        this.titleFormControl.setValue(org.name)
        this.descriptionFormControl.setValue(org.description)
      });
    }

    save() {
      if (this.orgId) {
        this.contentService.updateOrg(this.orgId, {
          name: this.titleFormControl.value,
          description: this.descriptionFormControl.value
        }).subscribe((org) => {
          this.router.navigate(['/curator']);
          window.location.reload();
        })
      } else {
        this.contentService.addOrg({
          name: this.titleFormControl.value,
          description: this.descriptionFormControl.value
        }).subscribe((org) => {
          this.router.navigate(['/curator']);
          window.location.reload();
        })
      }
    }

    cancel() {
      this.router.navigate(['/curator']);
    }
}
