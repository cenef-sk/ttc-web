import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-dialog-about',
  templateUrl: './dialog-about.component.html',
  styleUrls: ['./dialog-about.component.css']
})
export class DialogAboutComponent implements OnInit {
  public language = ""
  constructor(
    private translate: TranslateService,
  ) {
    this.language = translate.currentLang;
  }

  ngOnInit() {
  }

}
