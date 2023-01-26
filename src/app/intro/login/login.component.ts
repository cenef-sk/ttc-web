import { Component, OnInit, Inject } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { MyslimService } from '../../myslim.service';
import { parseJwt } from 'src/utils/token';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

declare const gapi: any;

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public error = false;
  public errMessage = "";

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);
  constructor(
    private globals: Globals,
    private router: Router,
    private services: MyslimService,
    @Inject('LOCALSTORAGE') public local,
  ) { }
  // onSignIn(googleUser) {
  //   var profile = googleUser.getBasicProfile();
  //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + profile.getName());
  //   console.log('Image URL: ' + profile.getImageUrl());
  //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  // }
  ngOnInit() {
//     let params = {
//     client_id: '101278585727-qr6jq13d8a23c32bn7akbc8r8qvbrqgr.apps.googleusercontent.com'
//     }
//     if (gapi) {
//       gapi.load('auth2', () => {
//         let auth2 = gapi.auth2.init(params);
//       //   console.log(auth2.isSignedIn.get())
//         // auth2.currentUser.listen(() => {
//       //   //   if(auth2 && auth2.currentUser) {
//       //   //     console.log(auth2.currentUser.get())
//       //   //   }
//         // });
//         // var auth2 = gapi.auth2.init(params);
//         let id = "gButton"
//         let options =   {
//   scope: 'email',
//   width: 200,
//   height: 50,
//   // longtitle: true,
//   // theme: 'dark',
//   onsuccess: (currentUser) => {
//     // console.log(gapi)
//     console.log("Great, it works")
//     let profile = currentUser.getBasicProfile()
//     console.log(profile.getEmail());
//     console.log(profile.getImageUrl());
//     // loginGoogleUser - service
//     // this.router.navigate(['/teacher']);
//   },
//   onfailure: () => console.log("does not works")
// }
//         gapi.signin2.render(id, options)
//       });
//     }
  }

  register() {
    this.router.navigate(['/register']);
  }

  forgot() {
    this.router.navigate(['/forgot']);
  }

  logout() {
    console.log("clicked")
    // function signOut() {
      // var auth2 = gapi.auth2.getAuthInstance();
      // auth2.signOut().then(function () {
      //   console.log('User signed out.');
      // });
    // }
  }

  login() {
    this.emailFormControl.markAsTouched()
    this.passwordFormControl.markAsTouched()
    const email = this.emailFormControl.value;
    const password = this.passwordFormControl.value;
    if (email && password) {
      this.services.getToken(email, password).
      pipe(
        catchError(err => {
          this.error = true;
          this.errMessage = "Please check your email and password!"
          return throwError(err);
        })
      ).subscribe(
        (data)=> {
          console.log(data);
          if (data && data.success && data.token) {
            this.globals.token = data.token;
            const dToken = parseJwt(this.globals.token);
            this.globals.user = {
              _id: dToken._id,
              name: dToken.name,
              role: dToken.role,
            };
            if (dToken.orgId) {
              this.globals.org = {
                _id: dToken.orgId,
                name: dToken.orgName,
                role: dToken.orgRole
              };
            }
            this.local.setItem('accessToken', this.globals.token);
            if(dToken.role === "Admin") {
              // this.router.navigate(['/admin']);
              this.router.navigate(['/curator']);
            } else if(dToken.role.includes("Curator")) {
              this.router.navigate(['/curator']);
            }
          } else {
            this.error = true;
            this.errMessage = "Please check your email and password!"
          }
        },
        (err) => {
          console.log(err);
          this.error = true;
        }
      );
    } else {
      this.error = true;
      this.errMessage = "Please check your email and password!"
    }
    // this.router.navigate(['/']);
  }

}
