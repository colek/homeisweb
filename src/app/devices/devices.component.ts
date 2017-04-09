import { Component, OnInit } from '@angular/core';
import { Device } from './../classes';
import { CommonService } from './../common.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
  providers: [Device, CommonService]
})
export class DevicesComponent implements OnInit {

  devices: Device[];
  strDevice: string;

  constructor(private _commonService: CommonService) {
    this.loadDevices();
   }

  ngOnInit() {
    // this.loadDevices();
  }

  loadDevices() {
    this._commonService.getDevices()
      .subscribe(
      data => {
        this.devices = data,
        this.strDevice = JSON.stringify(data)
      },
      error => console.error('Error: ' + error),
      () => console.log('Completed!')
      );
  }

}
