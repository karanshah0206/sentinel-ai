import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { webSocket } from "rxjs/webSocket";


@Component({
  selector: 'app-raw-footage',
  templateUrl: './raw-footage.component.html',
  styleUrls: ['./raw-footage.component.css']
})
export class RawFootageComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  constructor() {}
  
  subject = webSocket("192.168.1.109:9999");

  ngOnInit() {
    this.subject.subscribe((stream) => {
      console.log(stream);

      const videoPlayer = this.videoPlayer.nativeElement;
      videoPlayer.src = stream;

      videoPlayer.play();
    })
  }
}
