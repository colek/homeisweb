import { Component, OnInit, Input } from '@angular/core';
import { Device } from './../classes';

@Component({
  selector: 'devicesItem',
  templateUrl: './devices-item.component.html',
  styleUrls: ['./devices-item.component.css'],
  providers: [Device]
})
export class DevicesItemComponent implements OnInit {
 @Input() device: Device;
 strDevice: string;

  constructor() {
    
  }

  ngOnInit() {
  }

  onClick(event) {
    
    console.log('device click');

  }

}
