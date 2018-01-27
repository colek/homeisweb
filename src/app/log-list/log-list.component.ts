import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Logs, DetailSharingService } from './../classes';
import { CommonService } from './../common.service';
import { ActivatedRoute, Params } from '@angular/router';
import { close } from 'fs';

@Component({
  selector: 'log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css'],
  providers: [Logs, CommonService]
})
export class LogListComponent implements OnInit {
  
  logs: string[];
  currentLog: string;

  constructor(
    private _commonService: CommonService,
    private route: ActivatedRoute,
    private _location: Location,
    private _sahringService: DetailSharingService) { }

  ngOnInit() {
    this.loadLogs();
  }
  
  loadLogs(){
    this.route.params
      .switchMap((params: Params) => this._commonService.getLogs())
      .subscribe(
      data => {
        this.logs = data.reverse();
      },
      error => console.error('Error: ' + error),
      () => console.log('Completed!')
      );
  }

  onLogClick(cLog){
    this.currentLog = cLog;
  }

}
