import { Component, OnInit } from '@angular/core';
import { Globals } from "src/app/globals";
import { ContentService } from "src/app/content.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

    public games = [];
    displayedColumns: string[] = ['name', 'published', /*'rating',*/ 'difficulty', 'ageRestriction', 'view'];

    constructor(
      private globals: Globals,
      public contentService: ContentService,
      private router: Router,
    ) { }

    ngOnInit() {
      this.contentService.getGames().subscribe((res) => {
        this.games = res;
        this.contentService.getPubGames().subscribe((res: any) => {
          this.games.forEach(g => {

            let pubGame = res.find(pg => pg.game == g._id)
            if (pubGame) {
              g.published = true;
              g.codeOnly = pubGame.codeOnly
            } else {
              g.published = false;
            }
          })
        })
      })
    }

    newGame() {
      this.router.navigate(['/curator/new-game']);
    }

    editGame(game) {
      this.router.navigate(['/curator/edit-game', game._id]);
    }
}
