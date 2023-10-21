import { Component } from '@angular/core';
import { webSocket } from "rxjs/webSocket";

type streamType = {msg1: string, msg2: string, msg3: string[]}

@Component({
  selector: 'app-key-actions',
  templateUrl: './key-actions.component.html',
  styleUrls: ['./key-actions.component.css']
})
export class KeyActionsComponent {
  keyActions: string[];

  ngOnInit() {
    let subject = webSocket<streamType>({url: "ws://localhost:9999"});
    subject.subscribe((stream: streamType) => {
        this.keyActions = stream["msg3"];
    });
  }
}
