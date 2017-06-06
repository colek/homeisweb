import { Component, OnInit } from '@angular/core';
import { Device } from './../classes';
import { CommonService } from './../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
  providers: [Device, CommonService]
})
export class DevicesComponent implements OnInit {

  devices: Device[];
  strDevice: string;

  constructor(private _commonService: CommonService, private router: Router) {
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

  onNewDevice(){
    this.router.navigate(['/newdevice']);
  }

}
