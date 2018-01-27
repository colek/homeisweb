import { Component, OnInit } from '@angular/core';
import { CommonService } from './../common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css'],
  providers: [CommonService]
})
export class LogListComponent implements OnInit {
  
  logs: string[];
  currentLog: string;

  constructor(
    private _commonService: CommonService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadLogs();
  }
  
  loadLogs(){
    this._commonService.getLogs()
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
