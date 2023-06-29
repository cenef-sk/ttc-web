import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { Router, ActivatedRoute } from '@angular/router';
import { ContentService } from "../content.service";
import { TranslateService } from "@ngx-translate/core";

declare const Chart: any;

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  downloads = 0;
  analytics = [];
  displayedColumns = ['position', 'downloadId', 'answers'];

  constructor(
    private globals: Globals,
    private router: Router,
    public contentService: ContentService,
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) {
  }

  ngOnInit() {
    const snapshot = this.route.snapshot;
    if(snapshot.params.id) {
      this.contentService.getGameAnalytics(snapshot.params.id).subscribe( res => {
        this.analytics = res
      });

      this.contentService.getGameDownloads(snapshot.params.id).subscribe( res => {
        this.downloads = res
        const ctx = document.getElementById('myChart');

        this.translate.get('stats.downloads').subscribe((downloads) => {
          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: [downloads],
              datasets: [{
                label: downloads,
                data: [res],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
        })
      })
    }
  }

  save() {
    this.router.navigate(['/documents']);
  }
  cancel() {
    this.router.navigate(['/documents']);
  }
}
