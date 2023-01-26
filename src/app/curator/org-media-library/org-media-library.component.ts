import { Component, OnInit } from '@angular/core';
import { ContentService } from "src/app/content.service";
import { Globals } from "src/app/globals";
import { Router } from "@angular/router";

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
    //TODO
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
        alert("Položku sa nepodarilo vymazať.")
      }
    })
  }

  private deleteAsset(assetId) {
    this.contentService.deleteAsset(assetId).subscribe((res) => {
      if (res.success) {
        this.loadAssets();
        alert("Prebehlo úspešne vymazanie.")
      }
    })
  }

  delete(asset) {
    if (confirm("Naozaj chcete túto položku zmazať?")) {
      console.log(asset)
      if (asset.mediaContent) {
        this.deleteMediaAndAsset(asset._id);
      } else {
        this.deleteAsset(asset._id);
      }
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
