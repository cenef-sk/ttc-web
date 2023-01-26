import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyslimService } from '../../myslim.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public error1 = false;

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
    private services: MyslimService,
  ) { }

  ngOnInit() {
  }

  register() {
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
    // this.router.navigate(['/']);
  }
}
