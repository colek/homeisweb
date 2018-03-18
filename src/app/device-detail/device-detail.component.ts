import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Tag, SelectObj, Device } from 'app/classes';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DevicesService } from 'app/services/devices.service';
import { SharingService } from 'app/services/sharing-service.service';

@Component({
  selector: 'device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css'],
  providers: [Device, Tag]
})
export class DeviceDetailComponent implements OnInit {

  id: string;
  isNew: boolean;
  header: string;
  device: Device;

  isRunningText: string;
  btnRunningClass: string;

  @Input() addMode: boolean;
  @Output() addClicked = new EventEmitter();

  constructor(
    private _deviceService: DevicesService,
    private route: ActivatedRoute,
    private _location: Location,
    private _sahringService: SharingService,
    private router: Router) {       
    }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];    

    if (this.id == undefined) {
      this.isNew = true;
      this.header = "Nový datový bod";
      this.device = new Device();
    }
    else{
      this.isNew = false;
      this.header = "Datový bod";
      this.device = this._sahringService.getDevice();
      if(this.device == undefined){
        this.loadDevice();
      }
    }
    this.setScriptRunning();
  }

  onBack(){
    this._location.back();
  }

  loadDevice(){
      this.route.params
        .switchMap((params: Params) => this._deviceService.getDevice(params["id"]))
        .subscribe(
        data => {
          this.device = data[0];
          this.setScriptRunning();
        },
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
        );
  }

  onSave(){
    if(this.isNew){
    this._deviceService.addDevice(this.device)
      .subscribe(
      // data => this.strCom = JSON.stringify(data),
      error => console.error('Error: ' + error),
      () => {
        console.log('Completed!');
      }
      );
    }
    else{
      this._deviceService.editDevice(this.device)
      .subscribe(
      // data => this.strCom = JSON.stringify(data),
      error => console.error('Error: ' + error),
      () => {
        console.log('Completed!');
      }
      );
    }
  }

  onDelete(){
//todo
  }

  onReload(){
//todo
  }

  onNewTag(){
    this._sahringService.setDevice(this.device);
    this.router.navigate(['/edittag/new']);
  }

  switchOnOff() {
    this.device.Enabled = !this.device.Enabled;
    this.setScriptRunning();
  }

  setScriptRunning() {
    this.isRunningText = (this.device!=null && this.device.Enabled) ? "Zapnuto" : "Vypnuto";
    this.btnRunningClass = (this.device!=null && this.device.Enabled) ? "btn-success" : "btn-warning";
  }

  handleAddClick(event){
    this.addClicked.emit(event);
  }
}
