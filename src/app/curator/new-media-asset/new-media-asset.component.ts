import { Component, OnInit } from '@angular/core';
import { ContentService } from "src/app/content.service";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-new-media-asset',
  templateUrl: './new-media-asset.component.html',
  styleUrls: ['./new-media-asset.component.css']
})
export class NewMediaAssetComponent implements OnInit {

  public imgSrc = null;
  public file = null;

  titleFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', []);
  authorFormControl = new FormControl('', [Validators.required]);
  attributionFormControl = new FormControl('', []);
  copyrightFormControl = new FormControl('', []);

  privateUse = false;
  knownLicense = true;

  constructor(
    public contentService: ContentService,
    private domSanitizer: DomSanitizer,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  fileSelected(fileInputEvent: any) {
    if (fileInputEvent.target.files && fileInputEvent.target.files.length) {
      this.file = fileInputEvent.target.files[0]
      this.imgSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(this.file))
    }
  }

  deletePreview() {
    this.file = null;
    this.imgSrc = null;
  }

  save() {
    this.contentService.addMediaAsset({
      license: {
        onlyPersonalUse: !this.knownLicense,
        copyrightNotice: this.copyrightFormControl.value,
        attribution: this.attributionFormControl.value
      },
      metadata: {
        title: this.titleFormControl.value,
        description: this.descriptionFormControl.value,
        author: this.authorFormControl.value
      }
    }).subscribe((asset) => {
      this.contentService.
      upload(asset._id, this.file).
      subscribe(res => {
        this.router.navigate(['/curator/media-library']);
      })
    })
  }
  cancel() {
    this.router.navigate(['/curator/media-library']);
  }

}
