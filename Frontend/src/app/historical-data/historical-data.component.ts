import { Component } from '@angular/core';

@Component({
  selector: 'app-historical-data',
  templateUrl: './historical-data.component.html',
  styleUrls: ['./historical-data.component.css']
})
export class HistoricalDataComponent {
  data = [
    { id: "1", image: "url", 
    datetime: "11/09/1013 16:19:45", verdict: "hostile", 
    confidence: "10%"},
    { id: "2", image: "url", 
    datetime: "02/09/2023 02:29:45", verdict: "deceptive", 
    confidence: "30%"}
  ]

  searchText="";
}
