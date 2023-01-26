import { Component, OnInit, Inject } from '@angular/core';
import { ContentService } from "src/app/content.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ImageCroppedEvent } from "ngx-image-cropper";

@Component({
  selector: 'app-dialog-media',
  templateUrl: './dialog-media.component.html',
  styleUrls: ['./dialog-media.component.css']
})
export class DialogMediaComponent implements OnInit {

  assets = []
  originalWidth = null
  originalHeight = null

  wrapperWidth = 300
  wrapperWidthPx = null

  top = null;
  left = null;
  width = null
  height = null

  constructor(@Inject (MAT_DIALOG_DATA) public data: {
    finalize: any,
    crop: boolean
  },
    public contentService: ContentService,
    public dialogRef: MatDialogRef<DialogMediaComponent>
  ) {
    this.wrapperWidthPx = this.wrapperWidth + "px"
  }

  ngOnInit() {
    this.contentService.getMediaAssets().subscribe((res) => {
      this.assets = res;
    })
  }

  cropping = false;
  asset = null
  base64Image = null;

  selected(asset) {
    if(this.data.crop) {
      this.cropping = true;
      this.asset = asset
      this.loadImageFromURL(this.mediaUrl(asset)).then((base64Image) => {
        this.base64Image = base64Image
      })
    } else {
      this.data.finalize(asset);
      this.dialogRef.close()
    }
  }

  cropDone() {
    this.data.finalize(this.asset, {
      left: this.left,
      top: this.top,
      width: this.width,
      height: this.height
    });
    this.dialogRef.close()
  }

  mediaUrl(asset) {
    if (asset.mediaContent) {
      return this.contentService.API + 'assets/' + asset._id + '/media'
    } else {
      return "/assets/imagenotavailable_200.png"
    }
  }
  loadImageFromURL(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onerror = () => reject;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        this.originalWidth = img.width
        this.originalHeight = img.height
        if(context){
          context.drawImage(img, 0, 0);
        }
        resolve(canvas.toDataURL());
      };
      img.crossOrigin = 'anonymous';
      img.src = url;
    });
  }

  croppedImg = null
  croppedImage: any = '';

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;

      this.top = event.imagePosition.y1
      this.height = event.imagePosition.y2 - this.top
      this.left = event.imagePosition.x1
      this.width = event.imagePosition.x2 - this.left

      // this.loadCroppedImageFromURL(this.mediaUrl(this.asset))
  }
  // loadCroppedImageFromURL(url: string): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const img = new Image();
  //     img.onerror = () => reject;
  //     img.onload = () => {
  //       const canvas = document.createElement('canvas');
  //       const context = canvas.getContext('2d');
  //       canvas.width = this.wrapperWidth;
  //       canvas.height = this.wrapperWidth;
  //       this.originalWidth = img.width
  //       this.originalHeight = img.height
  //       console.log(this.left, this.top, this.width, this.height)
  //       if(context){
  //         context.drawImage(img,
  //           this.left, this.top, this.width, this.height,
  //           0, 0, this.wrapperWidth, this.wrapperWidth
  //         );
  //       }
  //       this.croppedImg = canvas.toDataURL()
  //       resolve(canvas.toDataURL());
  //     };
  //     img.crossOrigin = 'anonymous';
  //     img.src = url;
  //   });
  // }

  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }
}
