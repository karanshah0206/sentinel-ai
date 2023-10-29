import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { webSocket } from "rxjs/webSocket";

type streamType = {msg1: string, msg2: string, msg3: string[]}

@Component({
  selector: 'app-key-frames',
  templateUrl: './key-frames.component.html',
  styleUrls: ['./key-frames.component.css']
})
export class KeyFramesComponent {

  constructor(private sanitiser: DomSanitizer) {}

  lastDatum: string[] = [];
  keyFrames: string[] = [];

  ngOnInit() {
    let subject = webSocket<streamType>({url: "ws://localhost:9999"});
    subject.subscribe((stream: streamType) => {
      if (stream["msg3"].length != this.lastDatum.length) {
        this.lastDatum = stream["msg3"];
        if (this.lastDatum.length == 0) this.keyFrames = [];
        else this.keyFrames.push(stream["msg1"]);
      }
    });
  }

  base64ToImage(base64: string) {
    return this.sanitiser.bypassSecurityTrustResourceUrl('data:image/png;base64,' + base64);
  }

}
