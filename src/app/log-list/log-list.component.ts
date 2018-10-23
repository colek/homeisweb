import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogService } from 'app/services/log.service';

@Component({
  selector: 'log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css'],
  providers: []
})
export class LogListComponent implements OnInit {
  id: any;
  logs: string[];
  currentLog: string;

  constructor(
    private _logService: LogService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadLogs();
  }

  loadLogs() {
    this._logService.getLogs()
      .subscribe(
        data => {
          this.logs = data.reverse();
        },
        error => { },
        () => console.log('Completed!')
      );
  }

  onLogClick(cLog) {
    this.currentLog = cLog;
  }

}
