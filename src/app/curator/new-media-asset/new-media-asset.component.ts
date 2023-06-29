import { Component, OnInit } from '@angular/core';
import { ContentService } from "src/app/content.service";
import { DomSanitizer } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-new-media-asset',
  templateUrl: './new-media-asset.component.html',
  styleUrls: ['./new-media-asset.component.css']
})
export class NewMediaAssetComponent implements OnInit {

  public imgSrc = null;
  public file = null;
  public assetId = null;
  public mediaContent = null;


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
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    const snapshot = this.route.snapshot;
    if(snapshot.params.id) {
      this.loadAsset(snapshot.params.id);
    }
  }

  loadAsset(assetId: string) {
    this.contentService.getMediaAsset(assetId)
    .subscribe((asset) => {
      console.log(asset)

      this.assetId = asset._id
      this.mediaContent = asset.mediaContent
      this.knownLicense = !asset.license.onlyPersonalUse;
      this.copyrightFormControl.setValue(asset.license.copyrightNotice)
      this.attributionFormControl.setValue(asset.license.attribution)
      this.titleFormControl.setValue(asset.metadata.title)
      this.descriptionFormControl.setValue(asset.metadata.description)
      this.authorFormControl.setValue(asset.metadata.author)
      this.mediaContent = asset.mediaContent
    });
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
    if (this.file && !this.assetId) {
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
    } else if (this.file && this.assetId) {
      this.contentService.deleteMedia(this.assetId).subscribe((res) => {
        if (res.success) {
          this.contentService.updateMediaAsset(this.assetId, {
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
        } else {
          alert(this.translate.instant('media.removeProblem2'))
        }
      })
    } else if (!this.file && this.assetId) {
      this.contentService.updateMediaAsset(this.assetId, {
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
        this.router.navigate(['/curator/media-library']);
      })
    }
  }
  cancel() {
    this.router.navigate(['/curator/media-library']);
  }

  mediaUrl() {
    if (this.mediaContent) {
      return this.contentService.API + 'assets/' + this.assetId + '/media'
    } else {
      return "/assets/imagenotavailable_200.png"
    }
  }

}
