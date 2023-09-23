import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-target',
  templateUrl: './current-target.component.html',
  styleUrls: ['./current-target.component.css']
})
export class CurrentTargetComponent {

  constructor(private router: Router) {}

  onClick() {
    this.router.navigate(['../historical-data']);
  }
}
