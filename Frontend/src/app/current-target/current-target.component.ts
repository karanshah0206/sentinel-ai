import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-target',
  templateUrl: './current-target.component.html',
  styleUrls: ['./current-target.component.css']
})
export class CurrentTargetComponent {

  constructor(private router: Router) {}

  keyActions = [ "key action", "key action", "key action", "key action", "key action", "key action", "key action"];
  keyFrames = [ "key frame", "key frame", "key frame", "key frame", "key frame", "key frame", "key frame"];

  onClick() {
    this.router.navigate(['../historical-data']);
  }
}
