import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { webSocket } from "rxjs/webSocket";

type streamType = {msg1: string, msg2: string, msg3: string[]}

@Component({
  selector: 'app-raw-footage',
  templateUrl: './raw-footage.component.html',
  styleUrls: ['./raw-footage.component.css']
})
export class RawFootageComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  constructor() {}
  
  ngOnInit() {
    let subject = webSocket<streamType>({url: "ws://localhost:9999"});
    subject.subscribe((stream: streamType) => {
      const videoPlayer = this.videoPlayer.nativeElement;
      videoPlayer.src = "data:image/png;base64," + stream["msg1"];
    })
  }
}
