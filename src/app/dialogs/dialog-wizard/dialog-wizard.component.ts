import { Component, OnInit, Inject } from '@angular/core';

import { SmartStoryEngine } from 'smartstoryengine/dist/app/SmartStoryEngine';
import { Message as MessageInteraction } from 'smartstoryengine/dist/app/interaction-model/Message';
import { UserDecision } from 'smartstoryengine/dist/app/interaction-model/UserDecision';
import { UserInteraction } from 'smartstoryengine/dist/app/interaction-model/UserInteraction';
import { EndOfStory } from 'smartstoryengine/dist/app/interaction-model/EndOfStory';

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

import welcome from "src/wizard/sk/welcome.json";
import noWizard from "src/wizard/sk/no_wizard.json";
import license_media from "src/wizard/sk/license_media.json";
import game_selection from "src/wizard/sk/game_selection.json";
import img_selection from "src/wizard/sk/img_selection.json";
// import activitySelection from "src/wizard/sk/activity_selection.json";
// import memoryPairAdding from "src/wizard/sk/memory_pair_adding.json";
// import quizQuestionAdding from "src/wizard/sk/quiz_question_adding.json";

const wizards = {
  noWizard,
  license_media,
  game_selection,
  img_selection,
  welcome,
}

@Component({
  selector: 'app-dialog-wizard',
  templateUrl: './dialog-wizard.component.html',
  styleUrls: ['./dialog-wizard.component.css']
})
export class DialogWizardComponent implements OnInit {
  engine = null;
  // asynchronous tasks should be resolved
  toResolve = null;
  message = ""
  input = false;

  constructor(@Inject (MAT_DIALOG_DATA) public data: {
    wizardType: string,
    finalize: any
  },
  public dialogRef: MatDialogRef<DialogWizardComponent>
) {
    if(wizards[data.wizardType]) {
      this.engine = SmartStoryEngine.tellTheStory(wizards[data.wizardType])
    } else {
      this.engine = SmartStoryEngine.tellTheStory(wizards.noWizard)
    }
  }

  ngOnInit() {
    this.wizard()
  }

  postWizardProcessing() {
    // this.engine - access set parameters for different wizards
    this.data.finalize(this.engine);
  }

  wizard() {
    if (this.engine.hasNext()) {
      let next = this.engine.next();
      if (next instanceof EndOfStory) {
        console.log("StoryEnded");
        this.postWizardProcessing();
        this.dialogRef.close()
        return;
      }
      while (next instanceof MessageInteraction && next.message.trim().length == 0) {
        next = this.engine.next();
      }
      while(next instanceof MessageInteraction && next.message.trim().endsWith("<>")) {
        let newNextNode = this.engine.next();
        next.message = next.message.trim().slice(0, -2) + "<br>" + newNextNode.message;
        if (!newNextNode.message.trim().endsWith("<>")){
          break;
        }
      }

      this.userInteraction(next).then((data) => {
        // do something with engine
        console.log(data)
        this.wizard();
      })
    } else {
      console.log("CHAT ENDED");
    }
  }

//allowed interactions text, buttons, mediaAsset
  userInteraction(next) {
    return new Promise((resolve, reject) => {
      if (next instanceof MessageInteraction) {
        this.message += next.message;
        resolve("DONE");
        // setTimeout(() => {
        //   this.typing = true;
        //   setTimeout(() => {
        //     console.log(next.tags)
        //     if (next.tags && next.tags.includes("img")){
        //       this.chatHistory = this.chatHistory.concat(
        //         new Message(this.HE, "<img width='100%' src= '/assets/" + next.message + "'>")
        //       )
        //     } else {
        //       let res = this.replaceEmoji(next.message)
        //       this.chatHistory = this.chatHistory.concat(
        //         new Message(this.HE, res)
        //       )
        //     }
        //     this.typing = false;
        //     resolve("DONE")
        //       }, WRITING_DELAY)
        // }, BEFORE_WRITING_DELAY)
        //
      }
      if (next instanceof UserDecision) {
        this.toResolve = resolve;
        this.input = true;
        // setTimeout(() => {
        //   this.hidePrompt = false;
        //   this.inputType = OPTIONS;
        //   this.question = next.options.map((i) => this.replaceEmoji(i));
        //   this.typing = false;
        //   this.toResolve = resolve;
        // }, BEFORE_WRITING_DELAY)
      }
      if (next instanceof UserInteraction) {
        this.toResolve = resolve;
        // if (next.json.type == "wait") {
        //   setTimeout(() => {
        //     this.typing = false;
        //     this.engine.provideAnInput(null);
        //     resolve("WAITED");
        //   }, next.json.duration * 1000);
        // } else {
        //   setTimeout(() => {
        //     this.hidePrompt = false;
        //     switch(next.json.type) {
        //       case "radio":
        //         this.inputType = RADIO_QUESTION
        //         break;
        //       case "explained-check":
        //         this.inputType = EXPLAINED_CHECK_QUESTION
        //         break;
        //       case "free-text-check":
        //         this.inputType = FREE_TEXT_CHECK_QUESTION
        //         break;
        //       case "text":
        //         this.inputType = FREE_TEXT_QUESTION
        //         break;
        //       case "expand-check":
        //         this.inputType = EXPAND_CHECK_QUESTION
        //         break;
        //       case "scale":
        //         this.inputType = SCALE_QUESTION
        //         break;
        //     }
        //     this.question = next.json;
        //     this.typing = false;
        //     this.toResolve = resolve;
        //   }, BEFORE_WRITING_DELAY)
        // }
      }
    });
  }

  onAnswer(answer: any) {
    console.log(answer)
    let res;
    res = this.engine.makeAChoice(answer);
    this.message = ""

    // if (this.isOptions()) {
    //   res = this.engine.makeAChoice(answer);
    // } else {
    //   if(this.isRadioQuestion()) {
    //     if (answer.value) {
    //       this.engine.provideAnInput(answer.value);
    //     }
    //     if (answer.response) {
    //       res = answer.response;
    //     }
    //   } else if (this.isExplainedCheckboxesQuestion()) {
    //     this.engine.provideAnInput(answer[0]);
    //     res = "Moje správne odpovede: " + answer[1]
    //     console.log(this.engine.save())
    //   } else if (this.isFreeTextCheckboxesQuestion()) {
    //     this.engine.provideAnInput(answer[0]);
    //     res = answer[1]
    //     console.log(this.engine.save())
    //   } else if (this.isFreeTextQuestion()) {
    //     this.engine.provideAnInput(answer);
    //     console.log(this.engine.world)
    //     res = answer
    //     console.log(this.engine.save())
    //   } else if (this.isExpandableCheckboxesQuestion()) {
    //     this.engine.provideAnInput(answer[0]);
    //     console.log(this.engine.world)
    //     res = answer[1]
    //     console.log(this.engine.save())
    //   } else if (this.isScaleQuestion()) {
    //     this.engine.provideAnInput(answer[0]);
    //     console.log(this.engine.world)
    //     res = answer[1]
    //     console.log(this.engine.save())
    //   }
    // }

    if (this.toResolve) {
      // TODO engine answer userInput. setUserInput, ....
      this.toResolve(res);
      this.input = false;
      // this.hidePrompt = true;
      // this.inputType = null;
      // this.question = null;
      // if (res && res.trim()){
      //   this.chatHistory = this.chatHistory.concat(new Message(this.ME, this.replaceEmoji(res)));
      // }
    }
  }

}
