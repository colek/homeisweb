import { Component, OnInit } from '@angular/core';
import { Tag, SelectObj } from 'app/classes';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { SharingService } from 'app/services/sharing-service.service';
import { DevicesService } from 'app/services/devices.service';

@Component({
  selector: 'tag-item',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
  providers: []
})
export class TagComponent implements OnInit {
  Tag: Tag;
  isNew: boolean;
  id: string;
  header: string;

  isInternalText: string;
  btnInternalClass: string;
  txtIsError: string;
  btnErrorClass: string;
  txtIsSim: string;
  btnSimClass: string;
  boolValueText: string;
  btnBoolValueClass: string;

  tagDirectionText: string;

  typeSelect: SelectObj[];

  strCom: string;

  constructor(private _deviceService: DevicesService,
    private route: ActivatedRoute,
    private _location: Location,
    private _sahringService: SharingService) { }

  ngOnInit() {
    this.loadTypes();
    this.id = this.route.snapshot.params['id'];
    this.strCom = "xxx";

    if (this.id == undefined || this.id == "new") {
      this.isNew = true;
      this.header = "Nový tag";
      this.Tag = new Tag();
      this.Tag.internal = true;
      this.Tag.type = 0;
      this.Tag.direction = 2;
      this.Tag.ParentId = this._sahringService.getDevice().Id;
    }
    else {
      this.isNew = false;
      this.header = "Editace tagu";
      this.Tag = this._sahringService.getTag();
      this.strCom = JSON.stringify(this._sahringService.getTag());
      console.log(this.strCom);
      // this.route.params
      //   .switchMap((params: Params) => this.loadTag(this.parentId))
      //   .subscribe(
      //   // data => this.setTag(<Tag>data),
      //   data => this.setTag(<Device>data),
      //   error => console.error('Error: ' + error),
      //   () => console.log('Completed!')
      //   );

    }

    this.refreshButtons();
  }

  loadTag(parentId: string) {
    return this._deviceService.getTag(parentId);
  }

  refreshButtons(){
    if (this.Tag != undefined) {
      this.isInternalText = (this.Tag.internal) ? "Internal" : "Internal off";
      this.btnInternalClass = (this.Tag.internal) ? "btn-success" : "btn-warning";
      
      this.txtIsError = (this.Tag.error) ? "Odpojeno" : "Připojeno";
      this.btnErrorClass = (this.Tag.error) ? "btn-warning" : "btn-success";
      
      this.txtIsSim = (this.Tag.force) ? "Simulační režim: ANO" : "Simulační režim: NE";
      this.btnSimClass = (this.Tag.force) ? "btn-warning" : "btn-success";

      this.boolValueText = (this.Tag.value == "0") ? "Vypnuto" : "Zapnuto";
      this.btnBoolValueClass = (this.Tag.value == "0") ? "btn-warning" : "btn-success";
      
      switch (this.Tag.direction) {
        case 0: 
          this.tagDirectionText = "čtení";
          break;
        case 1: 
          this.tagDirectionText = "zápis";
          break;
        case 2: 
          this.tagDirectionText = "čtení / zápis";
          break;
      
        default:
        this.tagDirectionText = "nedefinováno";
          break;
      }
    }
  }

  // setTag(device: Device) {
  //   let tags = device.Tags.find(t => t.id == this.id)
  //   this.Tag = tags[0];
  //   this.strCom = JSON.stringify(device);
  //   return;

  // }

  onSave() {

    this.strCom = JSON.stringify(this.Tag);
    if(this.isNew){
      this._deviceService.addDeviceValue(this.Tag).subscribe(
        error => console.error('Error: ' + error),
        () => {
          console.log('Completed!');
  
          this.strCom = JSON.stringify(this.Tag);
        }
        );
    }
    this._deviceService.editTag(this.Tag)
      .subscribe(
      // data => this.strCom = JSON.stringify(data),
      error => console.error('Error: ' + error),
      () => {
        console.log('Completed!');

        this.strCom = JSON.stringify(this.Tag);
      }
      );
  }



  onBack() {
    this._location.back();
  }

  onDelete() {
    // this._commonService.deleteTag(this.id)
    //   .subscribe(
    //   data => this.strCom = JSON.stringify(data),
    //   error => console.error('Error: ' + error),
    //   () => console.log('Delete clicked!')
    //   );
  }


  // switchOnOff() {
  //   this.expression.running = !this.expression.running;

  //   this.isRunningText = (this.expression.running) ? "Zapnuto" : "Vypnuto";
  //   this.btnRunningClass = (this.expression.running) ? "btn-success" : "btn-warning";
  // }

  switchSim(){
    this.Tag.force = !this.Tag.force;
      this.refreshButtons();
  }
  switchInternal(){
    this.Tag.internal = !this.Tag.internal;
      this.refreshButtons();
  }
  switchBoolValue(){
    if(this.Tag.value == "0") this.Tag.value = "1";
    else this.Tag.value = "0";
      this.refreshButtons();
  }

  loadTypes() {
    this.typeSelect = new Array();

    this.typeSelect.push(new SelectObj("Unknown", -1));
    this.typeSelect.push(new SelectObj("Int", 0));
    this.typeSelect.push(new SelectObj("UInt", 1));
    this.typeSelect.push(new SelectObj("Double", 2));
    this.typeSelect.push(new SelectObj("String", 3));
    this.typeSelect.push(new SelectObj("Bool", 4));
  }

}
