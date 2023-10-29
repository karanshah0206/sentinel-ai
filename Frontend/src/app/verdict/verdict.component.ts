import { Component } from '@angular/core';

const URL = "https://localhost:7251/KeyActions";

const GREEN = "#004400";
const RED = "#E40000";

@Component({
  selector: 'app-verdict',
  templateUrl: './verdict.component.html',
  styleUrls: ['./verdict.component.css']
})
export class VerdictComponent {

  data = { verdict: "HOSTILE", confidence: "30%"};

  colour = GREEN;

  loadingResult = true;

  ngOnInit() {
    fetch(URL).then((fetchedResult) => {
      fetchedResult.json().then((jsonResult) => {
        this.data = jsonResult;
        this.loadingResult = false;
        switch (this.data.verdict) {
          case "HOSTILE":
          case "DECEPTIVE":
            this.colour = RED;
            this.colour = RED;
            break;
          default:
            break;
        }
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
