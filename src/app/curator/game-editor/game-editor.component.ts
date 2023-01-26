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

@Component({
  selector: 'app-game-editor',
  templateUrl: './game-editor.component.html',
  styleUrls: ['./game-editor.component.css']
})
export class GameEditorComponent implements OnInit {
  gameId = null
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
    // {
    //   id: "one-correct",
    //   name: "Správna voľba"
    // label: "editor.oneCorrect"
    // },
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

  constructor(
    private globals: Globals,
    public dialog: MatDialog,
    public contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) {}

  // preventExit(event) {
  //   event.returnValue = "Pred odchodom z tejto stánky si prosím uložte zmeny.";
  // }
  // ngOnDestroy() {
  //   window.removeEventListener('beforeunload', this.preventExit, false);
  // }
  ngOnInit() {
    // window.addEventListener('beforeunload', this.preventExit);

    this.orgFormControl.setValue(this.globals.org.name)
    this.orgFormControl.disable();
    this.codeFormControl.setValue(generateCode())
    this.codeFormControl.disable();

    const snapshot = this.route.snapshot;
    if(snapshot.params.id) {
      this.loadGame(snapshot.params.id);
    }
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
      this.selectedLevel = this.levels[game.difficulty]
      this.selectedAge = game.ageRestriction
      this.badgeFormControl.setValue(game.badge)
      this.introFormControl.setValue(game.introText)
      this.endFormControl.setValue(game.endText)
      this.codeFormControl.setValue(game.entryCode)
      this.published = game.published
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
  ages = ["3+","7+","12+","15+","18+"]
  selectedLevel = ""
  levels = ["Žiadne predchádzajúce znalosti nie sú potrebné","Základný prehľad v téme je potrebný","Obsah hry je vysoko odborný"]
  selectedLng = ""
  lngs = ["sk", "cz", "pl", "en"]
  published = false

  publish(){
    this.save(true)
  }

  test(){
    this.save(false, true)
  }

  save(publish = false, test = false) {
    this.acts.forEach(act => {
      console.log(act)
      if(act.transf) {
        act.position[0] = act.position[0] + act.transf[0]
        act.position[1] = act.position[1] + act.transf[1]
        delete(act.transf)
      }
    })

    this.acts.forEach(act => {
      if(act.type == "find-detail") {
        let pois = act.content.pois
        pois.forEach(poi => {
          if(poi.transf) {
            poi.position[0] = poi.position[0] + poi.transf[0]
            poi.position[1] = poi.position[1] + poi.transf[1]
            delete(poi.transf)
          }
        })
      }
    })
    console.log(this.selectedLevel)
    console.log(this.levels.indexOf(this.selectedLevel))
    let game = {
      name: this.titleFormControl.value,
      description: "New Game Description",
      bg: this.bg,
      activities: this.acts,
      language: this.selectedLng || "sk",
      difficulty: this.levels.indexOf(this.selectedLevel),
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
        } else {
          this.router.navigate(['/curator/games']);
        }
      })
    } else {
      this.contentService.addGame(game).subscribe((res) => {
        console.log(res)
        if (test) {
          window.open(this.contentService.WEB_APP + "?game_id=" + res._id, '_blank');
        } else {
          this.router.navigate(['/curator/games']);
        }
      })
    }
  }

  delete() {
    if (confirm("Naozaj chcete túto hru zmazať?")) {
      if (this.gameId) {
        this.contentService.deleteGame(this.gameId).subscribe((res) => {
          console.log(res)
          this.router.navigate(['/curator/games']);
        })
      } else {
        this.router.navigate(['/curator/games']);
      }
    }
  }
}
