import { Component } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-historical-data',
  templateUrl: './historical-data.component.html',
  styleUrls: ['./historical-data.component.css']
})
export class HistoricalDataComponent {

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
      datetime: new Date("11/09/2023 02:29:45"),
      verdict: "deceptive",
      confidence: "30%"
    }
  ]

  searchText="";

  filter() {
  }
}
