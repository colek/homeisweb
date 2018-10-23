import { Component, OnInit, Input } from '@angular/core';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';
import { LogService } from 'app/services/log.service';

@Component({
  selector: 'log-day',
  templateUrl: './log-day.component.html',
  styleUrls: ['./log-day.component.css']
})
export class LogDayComponent implements OnInit {

  @Input() currentLog: string;
  logText: string;

  constructor(
    private _logService: LogService) { }

  ngOnInit() {
  }

  ngOnChanges(chage: SimpleChange) {
    if (this.currentLog == undefined) return;

    this._logService.getLog(this.currentLog)
      .subscribe(
        data => {
          this.logText = data[this.currentLog];
        },
        error => { },
        () => console.log('Completed!')
      );
  }

}
