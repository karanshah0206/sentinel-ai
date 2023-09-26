import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-key-frames',
  templateUrl: './key-frames.component.html',
  styleUrls: ['./key-frames.component.css']
})
export class KeyFramesComponent {

  keyFrames = [ "key frame", "key frame", "key frame", "key frame", "key frame",
   "key frame", "key frame", "key frame", "key frame", "key frame", "key frame", 
   "key frame", "key frame", "key frame", "key frame", "key frame", "key frame"];

}
