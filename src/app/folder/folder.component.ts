import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tag, Folder, TagType } from 'app/classes';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SharingService } from 'app/services/sharing-service.service';
import { DevicesService } from 'app/services/devices.service';
import { ExpressionService } from 'app/services/expression.service';
import { TagService } from 'app/services/tag.service';

@Component({
  selector: 'folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css'],
  providers: []
})
export class FolderComponent implements OnInit {

  @Input() folderitem: Tag;
  @Input() previousfolderId: string;
  @Input() deviceid: string;
  @Input() addMode: boolean;

  @Output() addClicked = new EventEmitter();

  boolType: TagType = TagType.Bool;
  ico: string;
  boolIco: string;
  inError: string;
  hasBoolValue: boolean;
  currentValue: string;
  onlineState: string = 'action';

  constructor(private _deviceService: DevicesService,
    private _tagService: TagService,
    private _expressionService: ExpressionService,
    private router: Router,
    private _location: Location,
    private _sharingService: SharingService) {
  }

  ngOnInit() {
    this.switchIco();
    this.inError = (this.folderitem.error && !this.folderitem.internal) ? "danger" : "success";
    this.onlineState = (this.folderitem.error && !this.folderitem.internal) ? "danger" : "action";
  }

  onClick(event) {
    console.log('folder click');
    switch (this.folderitem.nodeName) {
      case "folder":
        this.router.navigate(['/folders/', this.folderitem.id]);
        break;
      case "previous":
        this._location.back();
        // let preFolder: Folder;

        // this._commonService.getFolder(this.previousfolderId)
        //   .subscribe(
        //   data => preFolder = data,
        //   error => {},
        //   () => this.router.navigate(['/folders/', preFolder.parentId])
        //   );
        // console.log('previous clicked');
        break;
    }
  }

  onBulbClick(event) {
    switch (this.folderitem.nodeName) {
      case "value":
        // TODO set value to opposite
        this.setBoolValueOpposite();
        console.log('bulb clicked value');
        event.stopPropagation();
        break;
      case "expression":
        // TODO set running to opposite
        this.setExpressionRunOpposite();
        console.log('bulb clicked expr');
        event.stopPropagation();
        break;
    }
  }

  onEdit(event) {
    event.stopPropagation();

    switch (this.folderitem.nodeName) {
      case "folder":
        this.router.navigate(['/editfolder/', this.folderitem.id]);
        break;
      case "expression":
        this.router.navigate(['/editexpression/', this.previousfolderId, this.folderitem.id]);
        break;
      case "value":
        if (this.deviceid == undefined)
          this.router.navigate(['/edittagfromfolder/', this.previousfolderId, this.folderitem.id]);
        else
          this.router.navigate(['/edittagfromdevice/', this.deviceid, this.folderitem.id]);
        break;
    }

  }

  onAdd(event) {
    this.addClicked.emit(this.folderitem);
    //event.stopPropagation();
    //this._sharingService.setTag(this.folder);
  }

  switchBool() {

    this.hasBoolValue = false;
    switch (this.folderitem.nodeName) {
      case "value":
        switch (+this.folderitem.value) {
          case 0: {
            this.boolIco = "Light Bulb Off";
            break;
          }
          case 1: {
            this.boolIco = "Light Bulb On";
            break;
          }
        }
        this.hasBoolValue = true;
        break;
      case "expression":
        switch (+this.folderitem.running) {
          case 0: {
            this.boolIco = "Light Bulb Off";
            break;
          }
          case 1: {
            this.boolIco = "Light Bulb On";
            break;
          }
        }
        this.hasBoolValue = true;
        break;
    }
  }

  switchIco() {
    switch (this.folderitem.nodeName) {
      case "value": {

        this.currentValue = this.folderitem.value + ' ' + this.folderitem.unit;
        switch (this.folderitem.type) {
          case TagType.Int: { // int
            this.ico = "Dashboard";
            break;
          }
          case TagType.Uint: {
            this.ico = "Dashboard";
            break;
          }
          case TagType.Double: { // double
            this.ico = "Dashboard";
            break;
          }
          case TagType.String: { // string
            this.ico = "Dashboard";
            break;
          }
          case TagType.Bool: { // bool
            this.ico = "System Preferences";
            this.switchBool();
            break;
          }
          case TagType.Enum: { // ??
            this.ico = "Dashboard";
            break;
          }
          case TagType.Email: { // ??
            this.ico = "Dashboard";
            break;
          }
          case 7: { // ??
            this.ico = "Dashboard";
            break;
          }
          default:
            {
              this.ico = "Briefcase";
              break;
            }
        }
        break;
      }
      case "folder": {
        this.ico = "Folder";
        break;
      }
      case "expression": {
        this.ico = "Cog";
        this.switchBool();
        break;
      }
      case "previous": {
        this.ico = "Arrow Left";
        break;
      }
      default: {
        this.ico = "Note Sticky";
        break;
      }
    }
  }

  setExpressionRunOpposite() {
    this.folderitem.running = !this.folderitem.running;
    this._expressionService.editExpressionFolder(this.folderitem)
      .subscribe(
        data => console.log(JSON.stringify(data)),
        error => { },
        () => console.log('Expression run!')
      );
  }

  setBoolValueOpposite() {
    // zmena hodnoty pouze bool
    if (this.folderitem.type == TagType.Bool && this.folderitem.direction > 0) {
      if (this.folderitem.value == "1") {
        this.folderitem.value = "0";
      }
      else {
        this.folderitem.value = "1";
      }

      this._tagService.saveTag(this.folderitem)
        .subscribe(
          data => console.log(JSON.stringify(data)),
          error => { },
          () => console.log('Tag saved!')
        );
    }

  }

  onRemoveTag() {
    this._deviceService.deleteTagFromFolder(this.folderitem.dirValueId)
      .subscribe(
        data => console.log(JSON.stringify(data)),
        error => { },
        () => console.log('Tag removed!')
      );
  }

}
