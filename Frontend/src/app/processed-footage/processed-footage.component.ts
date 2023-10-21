import { Component, ElementRef, ViewChild } from '@angular/core';
import { webSocket } from "rxjs/webSocket";

type streamType = {msg1: string, msg2: string, msg3: string[]}

@Component({
  selector: 'app-processed-footage',
  templateUrl: './processed-footage.component.html',
  styleUrls: ['./processed-footage.component.css']
})
export class ProcessedFootageComponent {
  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  constructor() {}

  ngOnInit() {
    let subject = webSocket<streamType>({url: "ws://localhost:9999"});
    subject.subscribe((stream: streamType) => {
      const videoPlayer = this.videoPlayer.nativeElement;
      videoPlayer.src = "data:image/png;base64," + stream["msg2"];
    })
  }
}
