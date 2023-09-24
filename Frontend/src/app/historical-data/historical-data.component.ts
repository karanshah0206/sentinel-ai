import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';

const days = [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday" ];
const months = [ "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december" ];

@Component({
  selector: 'app-historical-data',
  templateUrl: './historical-data.component.html',
  styleUrls: ['./historical-data.component.css']
})
export class HistoricalDataComponent {
  ColumnMode = ColumnMode;
  rows: { id: string; image: string; timestamp: Date; verdict: string; confidence: string; }[] = [];
  tempRows: { id: string; image: string; timestamp: Date; verdict: string; confidence: string; }[] = [];
  searchText = "";
  loadingResult = true;

  constructor(private router: Router) {}

  async ngOnInit() {
    fetch("https://localhost:7251/History").then((fetchedResult) => {
      fetchedResult.json().then((jsonResult) => {
        this.rows = jsonResult;
        this.rows.forEach(row => row.timestamp = new Date(row.timestamp));
        this.filter();
        this.loadingResult = false;
      }).catch(_ => {
        alert("Error occured while parsing data.");
      });
    }).catch((e) => {
      alert("Could not fetch data from the server.");
    });
  }

  onClick() {
    this.router.navigate(['../current-target']);
  }

  filter() {
    this.searchText = this.searchText.trim(); // removing leading and trailing whitespaces
    this.searchText = this.searchText.toLowerCase(); // make searched text lowercase
    // if no search text display all data
    if (this.searchText == "")
      this.tempRows = this.rows;
    else {
      this.tempRows = []; // empty temp rows array
      
      // filter data
      this.rows.forEach(row => {
        if (row.id.includes(this.searchText)
          || row.timestamp.toLocaleDateString().toLowerCase().includes(this.searchText)
          || row.timestamp.toLocaleTimeString().toLowerCase().includes(this.searchText)
          || days[row.timestamp.getDay()].includes(this.searchText)
          || months[row.timestamp.getMonth()].includes(this.searchText)
          || row.confidence.includes(this.searchText)
          || row.verdict.toLowerCase().includes(this.searchText)
        )
          this.tempRows.push(row); // push matched data into tempRows
      });
    }
  }
}
