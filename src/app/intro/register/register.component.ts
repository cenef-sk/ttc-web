import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyslimService } from '../../myslim.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { DialogTermsComponent } from "src/app/dialogs/dialog-terms/dialog-terms.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public error1 = false;
  public error2 = false;

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private services: MyslimService,
  ) { }

  ngOnInit() {
  }

  googleTerms = false;
  ourTerms = false;

  register() {
    this.error2 = false

    if (!this.ourTerms || !this.googleTerms) {
      this.error2 = true
    } else {
      let email = this.emailFormControl.value;
      let password = this.passwordFormControl.value;
      let name = this.nameFormControl.value;
      if (email && password && name) {
        this.services.createUser(name, email, password).
        pipe(
          catchError(err => {
            this.error1 = true;
            // this.errMessage = "Email address already exists"
            return throwError(err);
          })
        ).subscribe(
          (data)=> {
              console.log(data);
              this.router.navigate(['/']);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    }
    // this.router.navigate(['/']);
  }
  openDialogTerms() {
    const dialogRef = this.dialog.open(DialogTermsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
