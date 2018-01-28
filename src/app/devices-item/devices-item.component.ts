import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Device, DetailSharingService, Tag } from './../classes';
import { Router } from '@angular/router';

@Component({
  selector: 'devicesItem',
  templateUrl: './devices-item.component.html',
  styleUrls: ['./devices-item.component.css'],
  providers: [Device]
})
export class DevicesItemComponent implements OnInit {
 @Input() device: Device;
 @Input() addMode: boolean;
 @Output() addClicked = new EventEmitter();
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

  
  handleAddClick(event){
    this.addClicked.emit(event);
  }

}
