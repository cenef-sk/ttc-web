import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { DialogMediaComponent } from "src/app/dialogs/dialog-media/dialog-media.component";
import { ContentService } from "src/app/content.service";
import { MatDialog } from "@angular/material";
import { Globals } from "src/app/globals";
import { CdkDragEnd } from "@angular/cdk/drag-drop";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-game-bg',
  templateUrl: './game-bg.component.html',
  styleUrls: ['./game-bg.component.css']
})
export class GameBgComponent implements OnInit {
  @ViewChild('levelMap')
  levelMap: ElementRef<HTMLCanvasElement>;
  @ViewChild('levelMapImg')
  levelMapImg: ElementRef<HTMLImageElement>;
  private ctx: CanvasRenderingContext2D;

  @ViewChild('canvasMap')
  canvasMap: ElementRef<HTMLDivElement>;;

  circles = [
    "black.png","blue.png","azure.png","yellow.png","red.png","white.png"
  ]
  // bg = null;
  imgData = null;

  @Input() activities = [];
  @Input() bg = null;

  @Output() bgLoaded = new EventEmitter<any>();

  // started = false
  // paths = []

  constructor(
    private globals: Globals,
    public dialog: MatDialog,
    public contentService: ContentService,
    private sanitizer: DomSanitizer

  ) { }

  selected(index) {
      this.bg.selectedPointer = index

  }
  loaded(levelMapImg) {
    console.log(levelMapImg.clientWidth)
    let width = this.levelMapImg.nativeElement.getBoundingClientRect().width
    let height = this.levelMapImg.nativeElement.getBoundingClientRect().height
    console.log(width)
    console.log(height)
    this.bgLoaded.emit([width, height]);
  }

  dragEnd($event: CdkDragEnd,act) {
    act.transf = this.getMatrix($event.source.element.nativeElement)
  }

  getMatrix(element) {
      const values = element.style.transform.split(/\w+\(|\);?/);
      const transform = values[1].split(/,\s?/g).map((val) => {
        return(parseInt(val))
      });

      return [transform[0], transform[1]];
  }
  ngOnChanges(){
    console.log(this.bg)
    if (this.bg && this.bg.asset){
      this.loadImageFromURL(this.mediaUrl(this.bg.asset)).then(data => {
        this.imgData = data
      })
    }
  }
  ngOnInit() {
    console.log(this.bg)
    if (this.bg && this.bg.asset){
      this.loadImageFromURL(this.mediaUrl(this.bg.asset)).then(data => {
        this.imgData = data
      })
    }

    // var c = document.getElementById("levelMap");
    // this.ctx = this.levelMap.nativeElement.getContext('2d');
    // var ctx = c.getContext("2d");
    // // var img = document.getElementById("scream");
    // const img = new Image();   // Create new img element
    // img.src = 'http://127.0.0.1:3070/api/assets/63213f4cb1001c78fe0be2a7/media'; // Set source path
    //
    // img.addEventListener('load', () => {
    //   ctx.drawImage(img, 10, 10, img.width /5, img.height/5);
    //
    //   // var connections = document.getElementById("connections");
    //   // connections.style.top = "0px"
    //   // connections.style.left = "0px"
    //   // connections.width = img.width;
    //   // connections.height = img.height;
    //
    // }, false);
    // var scream = document.getElementById("connections");
    //
    // var started = false;
    //
    // var c2 = document.getElementById("connections");
    // var ctx2 = c2.getContext("2d");
    // this.ctx.beginPath();
    //
    // this.activities.forEach(act => {
    //
    // })
    //
    // var paths = [];
    //
    // let mousedown = (e) => {
    //   //5 - half of mark size
    //   console.log(e)
    //
    //   var x = e.offsetX
    //   var y = e.offsetY
    //   // var x = e.x - this.levelMap.nativeElement.getBoundingClientRect().left
    //   // var y = e.y - this.levelMap.nativeElement.getBoundingClientRect().top
    //
    //   console.log(x)
    //   console.log(y)
    //
    //   this.activities = this.activities.concat([[x,y]])
    //   console.log(this.paths)
    //   const imgPt = new Image();   // Create new img element
    //   imgPt.src = 'http://127.0.0.1:4200/assets/TTC_logo.png'; // Set source path
    //   imgPt.width = 20
    //   imgPt.height = 20
    //   imgPt.style.position = "absolute"
    //
    //   imgPt.style.top = (y - 10) +"px";
    //   imgPt.style.left = (x - 10) +"px";
    //   imgPt.addEventListener("mousedown", (e) => {
    //     console.log(e)
    //     // e.target.remove();
    //
    //   })
    //
    //   if(this.started) {
    //     this.ctx.lineTo(x, y);
    //     this.ctx.lineWidth = 5;
    //     this.ctx.stroke();
    //   } else {
    //     this.ctx.moveTo(x, y);
    //     this.started = true;
    //   }
    //   var canvasImg = document.getElementById("canvas-img");
    //   canvasImg.appendChild(imgPt)
    // }

    // this.levelMap.nativeElement.addEventListener("mousedown", function (e) {
    //     mousedown(e)
    // }, false);

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

        if(context){
          context.drawImage(img, 0, 0);
        }
        resolve(canvas.toDataURL());
      };
      img.crossOrigin = 'anonymous';
      img.src = url;
    });
  }
  mediaSelection(pair, itemNum) {
    this.dialog.open(DialogMediaComponent, {
      width: '800px',
      height: '400px',
      data: {
        finalize: (asset, crop?) => {
          this.bg.asset = asset
          this.loadImageFromURL(this.mediaUrl(this.bg.asset)).then(data => {
            this.imgData = data
          })
        },
        crop: false
      }
      });
  }


  mediaUrl(asset) {
    if (asset.mediaContent) {
      return this.contentService.API + 'assets/' + asset._id + '/media'
    } else {
      return "/assets/imagenotavailable_200.png"
    }
  }
  removeMedia() {
    this.bg.asset = null;
    this.imgData = null;
  }

}
