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
    else {
      this.isNew = false;
      this.header = "Datový bod";
      this.loadDevice();
    }
  }

  onBack() {
    this._location.back();
  }

  loadDevice() {
    this._deviceService.getDevice(this.id)
      .subscribe(
        data => {
          this.device = data;
          this.setScriptRunning();
        },
        error => { },
        () => console.log('Completed!')
      );
  }

  onSave() {
    if (this.isNew) {
      this._deviceService.addDevice(this.device)
        .subscribe(
          // data => this.strCom = JSON.stringify(data),
          error => { },
          () => {
            console.log('Completed!');
          }
        );
    }
    else {
      this._deviceService.editDevice(this.device)
        .subscribe(
          // data => this.strCom = JSON.stringify(data),
          error => { },
          () => {
            console.log('Completed!');
          }
        );
    }
  }

  onDelete() {
    //todo
  }

  onReload() {
    //todo
  }

  onNewTag() {
    this._sahringService.setDevice(this.device);
    this.router.navigate(['/newtag/' + this.id]);
  }

  switchOnOff() {
    this.device.enabled = !this.device.enabled;
    this.setScriptRunning();
  }

  setScriptRunning() {
    this.isRunningText = (this.device != null && this.device.enabled) ? "Zapnuto" : "Vypnuto";
    this.btnRunningClass = (this.device != null && this.device.enabled) ? "btn-success" : "btn-warning";
  }

  handleAddClick(event) {
    this.addClicked.emit(event);
  }
}
