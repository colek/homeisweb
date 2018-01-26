import { Component, OnInit } from '@angular/core';
import { Device } from './../classes';
import { Location } from '@angular/common';
import { Tag, SelectObj, DetailSharingService } from './../classes';
import { CommonService } from './../common.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css'],
  providers: [Device, Tag, CommonService]
})
export class DeviceDetailComponent implements OnInit {

  id: string;
  isNew: boolean;
  header: string;
  device: Device;

  isRunningText: string;
  btnRunningClass: string;

  constructor(
    private _commonService: CommonService,
    private route: ActivatedRoute,
    private _location: Location,
    private _sahringService: DetailSharingService) { }

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
  }

  onBack(){
    this._location.back();
  }

  loadDevice(){
      this.route.params
        .switchMap((params: Params) => this._commonService.getDevice(params["id"]))
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
    this._commonService.addDevice(this.device)
      .subscribe(
      // data => this.strCom = JSON.stringify(data),
      error => console.error('Error: ' + error),
      () => {
        console.log('Completed!');
      }
      );
    }
    else{
      this._commonService.editDevice(this.device)
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

  switchOnOff() {
    this.device.Enabled = !this.device.Enabled;
    this.setScriptRunning();
  }

  setScriptRunning() {
    this.isRunningText = (this.device.Enabled) ? "Zapnuto" : "Vypnuto";
    this.btnRunningClass = (this.device.Enabled) ? "btn-success" : "btn-warning";
  }
}
