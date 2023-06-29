import { Component, OnInit } from '@angular/core';
import { ContentService } from "src/app/content.service";
import { Globals } from "src/app/globals";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-org-media-library',
  templateUrl: './org-media-library.component.html',
  styleUrls: ['./org-media-library.component.css']
})
export class OrgMediaLibraryComponent implements OnInit {
  public assets = []

  constructor(
    private globals: Globals,
    public contentService: ContentService,
    private router: Router,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.loadAssets();
  }
  loadAssets() {
    this.contentService.getMediaAssets().subscribe((assets) => {
      this.assets = assets;
    })
  }

  add(){
    this.router.navigate(['/curator/new-media-asset']);
  }
  edit(asset){
    this.router.navigate(['/curator/edit-media-asset', asset._id]);
  }
  view(asset){
    //TODO
    this.router.navigate(['/curator/view-media-asset', asset._id]);
  }

  private deleteMediaAndAsset(assetId) {
    this.contentService.deleteMedia(assetId).subscribe((res) => {
      if (res.success) {
        this.deleteAsset(assetId)
      } else {
        alert(this.translate.instant('media.removeProblem'))
      }
    })
  }

  private deleteAsset(assetId) {
    this.contentService.deleteAsset(assetId).subscribe((res) => {
      if (res.success) {
        this.loadAssets();
        alert(this.translate.instant('media.removed'))
      }
    })
  }


  delete(asset) {
    if (confirm(this.translate.instant('media.confirmRemove'))) {
      this.contentService.isUsedAsset(asset._id).subscribe((res) => {
        if (res.success) {
          if (res.data.length) {
            let games = res.data.map(g => {
              if (g.game) {
                return g.name + " - publikovaná"
              } else {
                return g.name
              }
            }).join(", ")
            alert(this.translate.instant('media.unableToDelete') + games)
          } else {
            if (asset.mediaContent) {
              this.deleteMediaAndAsset(asset._id);
            } else {
              this.deleteAsset(asset._id);
            }
          }
        }
      })
    }
  }

  mediaUrl(asset) {
    if (asset.mediaContent) {
      return this.contentService.API + 'assets/' + asset._id + '/media'
    } else {
      return "/assets/imagenotavailable_200.png"
    }
  }

  bgMmediaUrl(asset){
    return("url('" + this.mediaUrl(asset)  +"')")

  }
}
