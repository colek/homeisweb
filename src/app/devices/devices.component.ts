import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Device, Tag } from 'app/classes';
import { Router } from '@angular/router';
import { DevicesService } from 'app/services/devices.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
  providers: [Device]
})
export class DevicesComponent implements OnInit {

  devices: Device[];
  strDevice: string;
  @Input() addMode: boolean;
  @Output() addClicked = new EventEmitter();

  constructor(private _deviceService: DevicesService, private router: Router) {
    this.loadDevices();
   }

  ngOnInit() {
    // this.loadDevices();
  }

  loadDevices() {
    this._deviceService.getDevices()
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

  

  handleAddClick(event){
    this.addClicked.emit(event);
  }

}
