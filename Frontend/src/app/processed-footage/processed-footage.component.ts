import { Component } from '@angular/core';
import { SignalrService } from '../signalr.service';
import { HttpClient } from '@angular/common/http';

const URL = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

@Component({
  selector: 'app-processed-footage',
  templateUrl: './processed-footage.component.html',
  styleUrls: ['./processed-footage.component.css']
})
export class ProcessedFootageComponent {
  constructor(public signalRService:  SignalrService, private http: HttpClient) {}

  ngOnInit() {
    this.signalRService.startConnection();
    this.startHttpRequest();
  }

  private startHttpRequest = () => {
    this.http.get(URL)
    .subscribe(res => {
      console.log(res);
    })
  }
}
