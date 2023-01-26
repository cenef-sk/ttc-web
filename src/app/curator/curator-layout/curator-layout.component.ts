import { Component, OnInit, Inject } from '@angular/core';
import { DialogAboutComponent } from "src/app/dialogs/dialog-about/dialog-about.component";
import { DialogTermsComponent } from "src/app/dialogs/dialog-terms/dialog-terms.component";
import { SharedService } from "src/app/shared.service";
import { MatDialog } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { ContentService } from "src/app/content.service";
import { Globals } from "src/app/globals";
import { parseJwt } from 'src/utils/token';

@Component({
  selector: 'app-curator-layout',
  templateUrl: './curator-layout.component.html',
  styleUrls: ['./curator-layout.component.css']
})
export class CuratorLayoutComponent implements OnInit {

      // public languages = ["SK"];
      public languages = ["SK", "CZ", "PL", "EN"];
      public language = "SK";

      public orgs = [];
      public selectedOrg = null;

      constructor(
        private globals: Globals,
        private router: Router,
        private translate: TranslateService,
        public dialog: MatDialog,
        public sharedService: SharedService,
        public contentService: ContentService,
        @Inject('LOCALSTORAGE') public local,
      ) {
        let savedLocale = this.local.getItem('locale');
        if (savedLocale) {
          this.setLanguage(savedLocale);
        }
        sharedService.setLng(translate.currentLang)

        contentService.getOrgsForUser(globals.user._id).subscribe((orgs) => {
          this.orgs = orgs
          if (this.globals.org) {
            this.selectedOrg = this.globals.org._id
          }
        })
      }

      ngOnInit() {
      }

      setLanguage(language){
        this.language = language;
        this.translate.use(language);
        this.local.setItem('locale', language)
        this.sharedService.setLng(this.translate.currentLang)
      }

      openDialogTerms() {
        const dialogRef = this.dialog.open(DialogTermsComponent);

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      }

      openDialogAbout() {
        const dialogRef = this.dialog.open(DialogAboutComponent);

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      }

      enter(){
        this.router.navigate(['/']);
      }

      differentString() {
        const d = new Date();
        return d.getTime();
      }

      create() {
        this.contentService.changeOrgToken(null).subscribe(
          (token) => {
            this.processToken(token)
            this.router.navigate(['/curator/new-org']);
            this.selectedOrg = this.differentString() //hack to have different for change
          }
        );
      }
      join() {
        this.contentService.changeOrgToken(null).subscribe(
          (token) => {
            this.processToken(token)
            this.router.navigate(['/curator/join']);
            this.selectedOrg = this.differentString() //hack to have different for change
          }
        );
      }
      manageOrgs() {
        this.contentService.changeOrgToken(null).subscribe(
          (token) => {
            this.processToken(token)
            this.router.navigate(['/curator/orgs-management']);
            this.selectedOrg = this.differentString() //hack to have different for change
          }
        );
      }
      changeOrg(orgId) {
          this.selectedOrg = orgId
          this.contentService.changeOrgToken(orgId).subscribe(
            (token) => {
              this.processToken(token)
              this.router.navigate(['/curator']);
            }
          );
      }

      processToken(token) {
        console.log(this)
        this.globals.token = token;
        const dToken = parseJwt(this.globals.token);
        this.globals.user = {
          _id: dToken._id,
          name: dToken.name,
          isGuest: dToken.isGuest,
        };
        if (dToken.orgId) {
          this.globals.org = {
            _id: dToken.orgId,
            name: dToken.orgName,
            role: dToken.orgRole
          };
        } else {
          this.globals.org = null
        }
        this.local.setItem('accessToken', this.globals.token);
      }
}
