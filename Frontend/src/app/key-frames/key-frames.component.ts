import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

const URL = "https://localhost:7251/KeyActions";

@Component({
  selector: 'app-key-frames',
  templateUrl: './key-frames.component.html',
  styleUrls: ['./key-frames.component.css']
})
export class KeyFramesComponent {


  keyFrames = [ "key frame", "key frame", "key frame", "key frame", "key frame",
   "key frame", "key frame", "key frame", "key frame", "key frame", "key frame", 
   "key frame", "key frame", "key frame", "key frame", "key frame", "key frame"];

  loadingResult = true;

  ngOnInit() {
    fetch(URL).then((fetchedResult) => {
      fetchedResult.json().then((jsonResult) => {
        this.keyFrames = jsonResult;
        this.loadingResult = false;
      }).catch(_ => {
        // alert("Error occured while parsing data.");
        this.loadingResult = false;
        console.error("Error occured while parsing data.");
      });
    }).catch((e) => {
      // alert("Could not fetch data from the server.");
      this.loadingResult = false;
      console.error("Could not fetch data from the server.");
    });
  }
}
