import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  //getting the cricketers Information
  @Input() chartData;
//getting the chart Meta data
  @Input() chartMetaInfo;

  constructor() { }

  ngOnInit() {
    //setting up the inital Context, Get the canvas element
    const canvas = <HTMLCanvasElement>document.getElementById('chart');
    // getContext will return the rendering context using it we can call the different methods and properties for creating shapes
    //we will be sending this context throught the methods to implement any drawing
    const context = canvas.getContext('2d');
    //To set up the inital background color for the drawing area
    context.fillStyle='#262a33';
    //fillRect will use the fillstyle color and starts from 0,0 position and draws a rectangle with the width and height provided in
     //metadata , This will set up the context will #262a33 backgound , on top of this we will start drawing.
    context.fillRect(0,0,this.chartMetaInfo.chartWidth,this.chartMetaInfo.chartHeight);
    //The below 4 functions , contain the logic of drawing the chart I will be explaining them in Steps sections
    this.drawBarChart(context);
    this.addTitleToChart(context);
    this.addFooterToChart(context);
    this.addHorizontalLines(context);

  }

  addTitleToChart(context){
    context.font = this.chartMetaInfo.titleFont;
    context.fillStyle = this.chartMetaInfo.titleColor;
    context.fillText(this.chartMetaInfo.title,100,30);
  }

  addFooterToChart(context) {
    context.font = this.chartMetaInfo.footerFont;
    context.fillStyle = this.chartMetaInfo.footerColor;
    context.fillText(this.chartMetaInfo.footerTitle,this.chartMetaInfo.chartWidth/2,this.chartMetaInfo.chartHeight-10);
  }

  addColumnName(context,name,xpos,ypos){
    context.font = this.chartMetaInfo.columnFont;
    context.fillStyle = this.chartMetaInfo.columnTitleColor;
    context.fillText(name,xpos,ypos);
  }

  addHorizontalLines(context) {
    context.font = this.chartMetaInfo.leftaxisFont;
    context.fillStyle = this.chartMetaInfo.leftaxisColor;

    for(var i=0; i<11; i++) {

      context.lineWidth = 0.5;
      context.beginPath();
      context.moveTo(25,(20*i)+40);
      context.lineTo(475,(20*i)+40);
      context.strokeStyle  = this.chartMetaInfo.leftaxisColor;
      context.stroke();
    }
  }

  addColumnHead(context,name,xpos,ypos){
    context.font = this.chartMetaInfo.columnFont;
    context.fillStyle = this.chartMetaInfo.columnTitleColor;
    context.fillText(name,xpos,ypos);
  }



  drawBarChart(context){

    for(let cricketer=0; cricketer<this.chartData.length; cricketer++) {
        context.fillStyle = "#36b5d8";
        let cricketerInfo = this.chartData[cricketer];
        context.fillRect(25 + cricketer*100, this.chartMetaInfo.chartHeight-cricketerInfo['centuries']*2-60, 50, cricketerInfo['centuries']*2);
        this.addColumnName(context,cricketerInfo.name, 25 + cricketer*100,this.chartMetaInfo.chartHeight-40);
        this.addColumnHead(context,cricketerInfo['centuries'],45 + cricketer*100,this.chartMetaInfo.chartHeight-cricketerInfo['centuries']*2-65)
      }

  }

}
