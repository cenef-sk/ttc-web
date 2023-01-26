import { Component, OnInit, Input } from '@angular/core';
import { Globals } from "src/app/globals";
import { MatDialog } from "@angular/material";
import { ContentService } from "src/app/content.service";
import { DialogMediaComponent } from "src/app/dialogs/dialog-media/dialog-media.component";
import { FormControl } from "@angular/forms";
import { loadCroppedImageFromURL } from "src/utils/imageUtils";

@Component({
  selector: 'app-pair',
  templateUrl: './pair.component.html',
  styleUrls: ['./pair.component.css']
})
export class PairComponent implements OnInit {
  @Input() pair = null;
  @Input() index = 0;

  item1FormControl = new FormControl();
  item2FormControl = new FormControl();
  explanationFormControl = new FormControl();


  constructor(
    private globals: Globals,
    public dialog: MatDialog,
    public contentService: ContentService
  ) { }

  ngOnInit() {
    if (this.pair) {
      this.explanationFormControl.setValue(this.pair.explanation)
      this.item1FormControl.setValue(this.pair.item1.text)
      this.item2FormControl.setValue(this.pair.item2.text)
      loadCroppedImageFromURL(this.mediaUrl(this.pair.item1.img), this.pair.item1.crop, this.imgWidth, this.imgWidth).then(data => {
        this.croppedImage1 = data
      })
      loadCroppedImageFromURL(this.mediaUrl(this.pair.item2.img), this.pair.item2.crop, this.imgWidth, this.imgWidth).then(data => {
        this.croppedImage2 = data
      })

    }

    this.explanationFormControl.valueChanges.subscribe((changedVal) => {
      this.pair.explanation = changedVal
    })
    this.item1FormControl.valueChanges.subscribe((changedVal) => {
      this.pair.item1.text = changedVal
    })
    this.item2FormControl.valueChanges.subscribe((changedVal) => {
      this.pair.item2.text = changedVal
    })
  }

  croppedImage1 = null
  croppedImage2 = null
  imgWidth = 300

  mediaSelection(pair, index) {
    this.dialog.open(DialogMediaComponent, {
      width: '800px',
      height: '400px',
      data: {
        finalize: (asset, crop?) => {
          if(index == 0) {
            pair.item1.img = asset._id
            pair.item1.crop = crop
            loadCroppedImageFromURL(this.mediaUrl(pair.item1.img), crop, this.imgWidth, this.imgWidth).then(data => {
              this.croppedImage1 = data
            })
          } else {
            pair.item2.img = asset._id
            pair.item2.crop = crop
            loadCroppedImageFromURL(this.mediaUrl(pair.item2.img), crop, this.imgWidth, this.imgWidth).then(data => {
              this.croppedImage2 = data
            })
          }
        },
        crop: true
      }
      });
  }


  mediaUrl(assetId) {
    return this.contentService.API + 'assets/' + assetId + '/media'
  }
}
