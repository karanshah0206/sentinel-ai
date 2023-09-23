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

  constructor(private router: Router) {}

  ColumnMode = ColumnMode;

  rows = [
    {
      id: "1",
      image: "url",
      datetime: new Date("11/09/2023 02:29:46"),
      verdict: "hostile",
      confidence: "10%"
    },
    {
      id: "2",
      image: "url",
      datetime: new Date("11/12/2023 02:29:45"),
      verdict: "deceptive",
      confidence: "30%"
    }
  ]

  searchText="";

  tempRows = this.rows

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
          || row.datetime.toLocaleDateString().toLowerCase().includes(this.searchText)
          || row.datetime.toLocaleTimeString().toLowerCase().includes(this.searchText)
          || days[row.datetime.getDay()].includes(this.searchText)
          || months[row.datetime.getMonth()].includes(this.searchText)
          || row.confidence.includes(this.searchText)
          || row.verdict.toLowerCase().includes(this.searchText)
        )
          this.tempRows.push(row); // push matched data into tempRows
      });
    }
  }
}
