import { Component, OnInit, Input } from '@angular/core';
import { Device, DetailSharingService } from './../classes';
import { Router } from '@angular/router';

@Component({
  selector: 'devicesItem',
  templateUrl: './devices-item.component.html',
  styleUrls: ['./devices-item.component.css'],
  providers: [Device]
})
export class DevicesItemComponent implements OnInit {
 @Input() device: Device;
 strDevice: string;

  constructor( 
  private router: Router, 
  private _sharingService: DetailSharingService) {
    
  }

  ngOnInit() {
  }

  onClick(event) {
    
    console.log('device click');

  }

  onEdit(event){
    this._sharingService.setDevice(this.device);
    this.router.navigate(['/device/', this.device.Id]);
  }

}
