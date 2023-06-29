import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Globals } from "src/app/globals";
import { MatAccordion, MatDialog } from "@angular/material";
import { DialogMediaComponent } from "src/app/dialogs/dialog-media/dialog-media.component";
import { ContentService } from "src/app/content.service";
import { GameBgComponent } from "../game-builder/game-bg/game-bg.component";
import { Router, ActivatedRoute } from "@angular/router";
import { generateCode } from "src/utils/trialCode";
import { TranslateService } from "@ngx-translate/core";

import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-game-editor',
  templateUrl: './game-editor.component.html',
  styleUrls: ['./game-editor.component.css']
})
export class GameEditorComponent implements OnInit {
  gameId = null
  trusted = false
  public FIXED_TABS = 2
  ACTS=[
    {
      id: "memory",
      name: "Pexeso",
      label: "editor.findPairs"
    },
    {
      id: "timeline",
      name: "Časová os",
      label: "editor.timeline"
    },
    {
      id: "quiz",
      name: "Kvíz",
      label: "editor.quiz"
    },
    {
      id: "find-detail",
      name: "Nájdi na obrázku",
      label: "editor.findOnImage"
    },
    {
      id: "one-correct",
      name: "Správna voľba",
      label: "editor.oneCorrect"
    },
    {
      id: "open-question",
      name: "Otvorené otázky",
      label: "editor.openQuestion"
    }
   ]

   @ViewChild('bgComponent') bgComponent: GameBgComponent;

     acts = []; //{name, type}
     bg = {
       asset: null,
       width: 0,
       height: 0,
       selectedPointer: 0,
     }
     selected = new FormControl(0);

     subscription: Subscription;

  constructor(
    private globals: Globals,
    public dialog: MatDialog,
    public contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) {
  }

  levels() {
    return this.translate.get("games.levels")
  }

  // preventExit(event) {
  //   event.returnValue = "Pred odchodom z tejto stánky si prosím uložte zmeny.";
  // }
  ngOnDestroy() {
    console.log("exit and save")
    if (this.subscription) {
      this.unsubscribe()
      this.save();
    }
    // window.removeEventListener('beforeunload', this.preventExit, false);
  }
  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  ngOnInit() {
    // window.addEventListener('beforeunload', this.preventExit);

    this.orgFormControl.setValue(this.globals.org.name)
    this.orgFormControl.disable();
    this.codeFormControl.setValue(generateCode())
    this.codeFormControl.disable();

    const snapshot = this.route.snapshot;
    if(snapshot.params.id) {
      this.loadGame(snapshot.params.id);
      if (this.globals.org) {
        this.loadOrg(this.globals.org._id);
      }
      const source = interval(30000);
      this.subscription = source.subscribe(val => this.save());
    } else {
      this.save();
    }
  }



  loadOrg(orgId: string) {
    this.contentService.getOrg(orgId)
    .subscribe((org) => {
      if (org) {
        this.trusted = org.trusted;
      }
    });
  }

  loadGame(gameId: string) {
    this.contentService.getGame(gameId)
    .subscribe((game) => {
      this.gameId = game._id;
      this.titleFormControl.setValue(game.name)
      // this.descriptionFormControl = game.description
      this.bg = game.bg
      this.acts = game.activities
      this.selectedLng = game.language
      this.selectedLevel = game.difficulty
      this.selectedAge = game.ageRestriction
      this.badgeFormControl.setValue(game.badge)
      this.introFormControl.setValue(game.introText)
      this.endFormControl.setValue(game.endText)
      this.codeFormControl.setValue(game.entryCode)
      this.published = game.published
      this.contentService.getPubGames().subscribe((res: any) => {
        let pubGame = res.find(g => g.game == gameId)
        if (pubGame) {
          this.published = true;
          this.codeOnly = pubGame.codeOnly
        } else {
          this.published = false;
        }
      })

    });
  }

  openMedia() {
    this.dialog.open(DialogMediaComponent, {
      width: '300px',
      data: {
        finalize: (assetId) => {
          console.log(assetId)
        }
      }
      });
  }

  createAct(ACT, activity) {
    activity.name = ACT.name;
    activity.label = ACT.label;
    // this.globals.game.activities = this.globals.game.activities.concat({
    //   type: activity.id,
    //   name: activity.name
    // })
  }


  mediaUrl(asset) {
    if (asset.mediaContent) {
      return this.contentService.API + 'assets/' + asset._id + '/media'
    } else {
      return "/assets/imagenotavailable_200.png"
    }
  }

  selection($event) {
    if( $event == this.acts.length + this.FIXED_TABS) {
      this.acts.push({
        name: "Nová Aktivita",
        label: "editor.new",
        type: null,
        config: null,
        content: null,
        position: [(this.acts.length * 10 + 10), (this.acts.length * 10 + 10)]
      });
    } else {
      this.selected.setValue($event)
    }
  }

  change($event) {
    if( $event.index == this.acts.length + this.FIXED_TABS - 1) {
      this.selected.setValue(this.acts.length + this.FIXED_TABS - 1)
    }
  }

  removeActivity(act, index: number) {
    this.acts.splice(index, 1);
    this.selected.setValue(this.FIXED_TABS + index - 1)
  }
// BACKGROUND LOADING

  bgLoaded($event) {
    console.log($event)
    this.bg.width = $event[0]
    this.bg.height = $event[1]
  }

// BASIC SETTINGS
  titleFormControl = new FormControl('', [Validators.required]);
  orgFormControl = new FormControl()
  codeFormControl = new FormControl()
  introFormControl = new FormControl()
  endFormControl = new FormControl()
  badgeFormControl = new FormControl()
  selectedAge = ""
  ages = ["12+","15+","18+"]
  // ages = ["3+","7+","12+","15+","18+"]
  selectedLevel = -1
  selectedLng = ""
  lngs = ["sk", "cz", "pl", "en"]
  published = false
  codeOnly = false

  publish(codeOnly = false){
    this.save(true, false, codeOnly)
  }

  unpublish(){
    this.contentService.unpublishGame(this.gameId).subscribe((res) => {
      this.published = false
      alert(this.translate.instant('games.unpublished'))
    })
  }

  test(){
    this.save(false, true)
  }

  save(publish = false, test = false, codeOnly = false) {

    // console.log(this.selectedLevel)
    // console.log(this.levels.indexOf(this.selectedLevel))
    let game = {
      name: this.titleFormControl.value,
      description: "New Game Description",
      bg: this.bg,
      activities: this.acts.map((act) => {
        let res = null
        if(act.transf) {
          res =  Object.assign({}, act, {position: [act.position[0] + act.transf[0], act.position[1] + act.transf[1]]})
          delete(res.transf)
        } else {
          res = Object.assign({}, act)
        }
        if(res.type == "find-detail") {
          res.content.pois = res.content.pois.map(poi => {
            if(poi.transf) {
              let resPoi =  Object.assign({}, poi, {position: [poi.position[0] + poi.transf[0], poi.position[1] + poi.transf[1]]})
              delete(resPoi.transf)
              return resPoi
            } else {
              return Object.assign({}, poi)
            }
          })
        }
        return res
      }),
      language: this.selectedLng || "sk",
      difficulty: this.selectedLevel,
      ageRestriction: this.selectedAge,
      badge: this.badgeFormControl.value,
      introText: this.introFormControl.value,
      endText: this.endFormControl.value,
      entryCode: this.codeFormControl.value,
      published: false
    }
    if (publish) {
      game.published = true
    }

    if (this.gameId) {
      this.contentService.updateGame(this.gameId, game).subscribe((res) => {
        console.log(res)
        if (test) {
          window.open(this.contentService.WEB_APP + "?game_id=" + this.gameId, '_blank');
        }
        if(publish) {
          let body = {}
          if (codeOnly) {
            body = {
              codeOnly: true
            }
          }
          this.contentService.publishGame(this.gameId, body).subscribe((res) => {
            this.published = true
            this.codeOnly = codeOnly
            if (this.codeOnly) {
              alert(this.translate.instant('games.codePublished'))
            } else {
              alert(this.translate.instant('games.published'))
            }
          })
        }
      })
    } else {
      this.contentService.addGame(game).subscribe((g) => {
        if (test) {
          window.open(this.contentService.WEB_APP + "?game_id=" + g._id, '_blank');
        } else {
          this.router.navigate(['/curator/edit-game', g._id]);
        }
      })
    }
  }

  results() {
    this.router.navigate(['/curator/results', this.gameId]);
  }

  share(){
      let title = encodeURI(this.titleFormControl.value)
      let url= 'https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=https%3A%2F%2Fapp.touchtheculture.eu%2Fweb%2F%3Fgame_id%3D' + this.gameId + '&display=popup&ref=plugin&src=share_button&quote='+title

      let options = 'toolbar=0,status=0,resizable=1,width=626,height=436';
      window.open(url,'sharer',options);
  }

  delete() {
    if (confirm(this.translate.instant('games.removeConfirm'))) {
      if (this.gameId) {
        this.unsubscribe()
        this.contentService.deleteGame(this.gameId).subscribe((res) => {
          console.log(res)
          this.router.navigate(['/curator/games']);
        })
      } else {
        this.router.navigate(['/curator/games']);
      }
    }
  }


  checkActivity(act) {
    if(act.type) {
      if (act.type == this.ACTS[0].id) {//memory
        if(act.content.pairs && act.content.pairs.length == 6) {
          return true
        }
      } else if (act.type == this.ACTS[1].id) {//timeline
          if(act.content.items && !act.content.items.includes(null)) {
            return true
          }
      } else if (act.type == this.ACTS[2].id) {//quiz
          if(act.content.questions && act.content.questions.length) {
            return true
          }
      } else if (act.type == this.ACTS[3].id) {//locate on image
          if(act.content.pois && act.content.pois.length) {
            return true
          }
      } else if (act.type == this.ACTS[4].id) {//correct one
          if(act.content.questions && act.content.questions.length) {
            return true
          }
      } else if (act.type == this.ACTS[5].id) {//open question
          if(act.content.questions && act.content.questions.length) {
            return true
          }
      }
    }
    return false
  }

  actIcon(index) {
    if (this.checkActivity(this.acts[index])) {

      return true;
    } else {

      return false;
    }
  }
}
