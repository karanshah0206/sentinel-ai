import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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

  imgHeight = 100;

  tempRows: { id: string; image: string; timestamp: Date; verdict: string; confidence: string; }[] = [];
  searchText = "";
  loadingResult = true;
  // Add a variable to store the selected dropdown option
  selectedOption = "All"; // Default selected option
  constructor(private router: Router, 
    private sanitiser: DomSanitizer) {}

  async ngOnInit() {
    fetch("https://localhost:7251/History/all").then((fetchedResult) => {
      fetchedResult.json().then((jsonResult) => {
        this.rows = jsonResult;
        this.rows.forEach(row => {
          row.timestamp = new Date(row.timestamp)
          row.id = row.id.toString()
        });
        this.filter();
        this.loadingResult = false;
      }).catch(_ => {
        // alert("Error occured while parsing data.");
        this.loadingResult = false;
        this.filter();
      });
    }).catch((e) => {
      // alert("Could not fetch data from the server.");
      this.loadingResult = false;
      this.filter();
    });
  }

  onClick() {
    this.router.navigate(['../']);
  }

  base64ToImage(base64: string) {
    return this.sanitiser.bypassSecurityTrustResourceUrl('data:image/png;base64,' + base64);
  }
  
  filter() {
    this.searchText = this.searchText.trim().toLowerCase(); // Normalize searchText

    // Apply filtering based on the selected dropdown option
    switch (this.selectedOption) {
      case "All":
        this.tempRows = this.rows.filter(row =>
          row.id.includes(this.searchText) ||
          row.timestamp.toLocaleDateString().toLowerCase().includes(this.searchText) ||
          row.timestamp.toLocaleTimeString().toLowerCase().includes(this.searchText) ||
          days[row.timestamp.getDay()].includes(this.searchText) ||
          months[row.timestamp.getMonth()].includes(this.searchText) ||
          row.confidence.includes(this.searchText) ||
          row.verdict.toLowerCase().includes(this.searchText)
        );
        break;
      case "ID":
        this.tempRows = this.rows.filter(row => row.id.includes(this.searchText));
        break;
      case "Timestamp":
        this.tempRows = this.rows.filter(row =>
          row.timestamp.toLocaleDateString().toLowerCase().includes(this.searchText) ||
          row.timestamp.toLocaleTimeString().toLowerCase().includes(this.searchText) ||
          days[row.timestamp.getDay()].includes(this.searchText) ||
          months[row.timestamp.getMonth()].includes(this.searchText)
        );
        break;
      case "Verdict":
        this.tempRows = this.rows.filter(row => row.verdict.toLowerCase().includes(this.searchText));
        break;
      case "Confidence":
        this.tempRows = this.rows.filter(row => row.confidence.includes(this.searchText));
        break;
      default:
        this.tempRows = this.rows;
    }
  }
}
