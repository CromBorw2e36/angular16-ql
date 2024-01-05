import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare var faceapi: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  async ngOnInit(): Promise<void> {
  }

  async ngAfterViewInit() {}
  
}
