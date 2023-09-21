import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.css']
})
export class ViewHistoryComponent {
  constructor(private router: Router) {}

  async onClick() {
    this.router.navigate(['../historical-data']);
  }
}
