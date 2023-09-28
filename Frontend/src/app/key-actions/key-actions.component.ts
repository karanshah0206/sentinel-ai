import { Component } from '@angular/core';

const URL = "https://localhost:7251/KeyActions";

@Component({
  selector: 'app-key-actions',
  templateUrl: './key-actions.component.html',
  styleUrls: ['./key-actions.component.css']
})
export class KeyActionsComponent {
  keyActions = [ "key action", "key action", "key action", "key action", "key action",
   "key action", "key action", "key action", "key action", "key action", "key action", 
   "key action", "key action", "key action", "key action", "key action", "key action"];

  loadingResult = true;

  ngOnInit() {
    fetch(URL).then((fetchedResult) => {
      fetchedResult.json().then((jsonResult) => {
        this.keyActions = jsonResult;
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
