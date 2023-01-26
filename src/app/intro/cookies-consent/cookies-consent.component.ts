import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialog } from "@angular/material";
import { DialogTermsComponent } from "src/app/dialogs/dialog-terms/dialog-terms.component";

@Component({
  selector: 'app-cookies-consent',
  templateUrl: './cookies-consent.component.html',
  styleUrls: ['./cookies-consent.component.css']
})
export class CookiesConsentComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    @Inject('LOCALSTORAGE') public local,
  ) {
  }

  ngOnInit() {
  }

  dismiss() {
    this.snackBar.dismiss();
    this.local.setItem('consent', "yes");
  }

  openDialogTerms() {
    const dialogRef = this.dialog.open(DialogTermsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
