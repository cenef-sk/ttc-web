import { Component, Inject } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Globals } from './globals';
import { valid, parseJwt } from 'src/utils/token';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  constructor(
    private globals: Globals,
    private router: Router,
    @Inject('LOCALSTORAGE') public local,
    translate: TranslateService
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('SK');

     // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('SK');

  }

  ngOnInit(){
    const accessToken = this.local.getItem('accessToken')
    if (accessToken) {
      if (valid(accessToken)) {
        this.globals.token = accessToken;
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
        console.log("Processing LOCALSTORAGE")
        // if(dToken.roles.includes("Admin")) {
        //   this.router.navigate(['/admin']);
        // } else if(dToken.roles.includes("Teacher")) {
        //   this.router.navigate(['/teacher']);
        // }
      }
    }
    console.log(this.globals)
  }
}
