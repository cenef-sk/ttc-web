import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogTermsComponent } from '../../dialogs/dialog-terms/dialog-terms.component';
import { DialogAboutComponent } from '../../dialogs/dialog-about/dialog-about.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CookiesConsentComponent } from "../cookies-consent/cookies-consent.component";
import { SharedService } from "src/app/shared.service";

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {

  // TODO implement other language mutations
  // public languages = ["SK"];
  public languages = ["SK", "CZ", "PL", "EN"];
  public language = "SK";

  constructor(
    private router: Router,
    private translate: TranslateService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public sharedService: SharedService,
    @Inject('LOCALSTORAGE') public local,
    @Inject(LOCALE_ID) public locale: string
  ) {

    console.log(sharedService.lngSelector)
    let consent = this.local.getItem('consent');
    if (!consent) {
      this.snackBar.openFromComponent(CookiesConsentComponent);
    }
    let savedLocale = this.local.getItem('locale');
    if (!savedLocale) {
      this.setLanguage(this.languages[0]);
      // if (locale.startsWith("sk")) {
      //   this.setLanguage(this.languages[0]);
      // } else if (locale.startsWith("cs")) {
      //   this.setLanguage(this.languages[1]);
      // } else if (locale.startsWith("pl")) {
      //   this.setLanguage(this.languages[2]);
      // } else {
      //   this.setLanguage(this.languages[3]);
      // }
    } else {
      this.setLanguage(savedLocale);
    }
    sharedService.setLng(translate.currentLang)
  }

  ngOnInit() {
  }

  setLanguage(language){
    this.language = language;
    this.translate.use(language);
    this.local.setItem('locale', language)
    this.sharedService.setLng(this.translate.currentLang)
  }

  openDialogAbout() {
    const dialogRef = this.dialog.open(DialogAboutComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogTerms() {
    const dialogRef = this.dialog.open(DialogTermsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  enter(){
    this.router.navigate(['/']);
  }
  home(){
    this.router.navigate(['/']);
  }
}
