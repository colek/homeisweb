import { Component, OnInit, Input } from '@angular/core';
import { Tag, Folder, DetailSharingService } from './../classes';
import { CommonService } from './../common.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css'],
  providers: [Tag, Folder]
})
export class FolderComponent implements OnInit {

  @Input() folder: Tag;
  @Input() previousfolderId: string;
  @Input() deviceid: string;

  ico: string;
  boolIco: string;
  inError: string;
  hasBoolValue: boolean;
  currentValue: string;

  constructor(private _commonService: CommonService, 
  private router: Router, 
  private _location: Location, 
  private _sharingService: DetailSharingService) {
  }

  ngOnInit() {
    this.switchIco();
    this.inError = (this.folder.error && !this.folder.internal) ? "danger" : "success";
  }

  onClick(event) {
    console.log('folder click');
    switch (this.folder.NodeName) {
      case "folder":
        this.router.navigate(['/folders/', this.folder.id]);
        break;
      case "previous":
        this._location.back();
        // let preFolder: Folder;

        // this._commonService.getFolder(this.previousfolderId)
        //   .subscribe(
        //   data => preFolder = data,
        //   error => console.error('Error: ' + error),
        //   () => this.router.navigate(['/folders/', preFolder.parentId])
        //   );
        // console.log('previous clicked');
        break;
    }
  }

  onBulbClick(event) {
    switch (this.folder.NodeName) {
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

    switch (this.folder.NodeName) {
      case "folder":
        this.router.navigate(['/editfolder/', this.folder.id]);
        break;
      case "expression":
        this.router.navigate(['/editexpression/', this.previousfolderId, this.folder.id]);
        break;
      case "value":
        this._sharingService.setTag(this.folder);
        this.router.navigate(['/edittag/', this.folder.id]);
        break;
    }

  }

  switchBool() {

    this.hasBoolValue = false;
    switch (this.folder.NodeName) {
      case "value":
        switch (+this.folder.value) {
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
        switch (+this.folder.running) {
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
    switch (this.folder.NodeName) {
      case "value": {

        this.currentValue = this.folder.value +' '+ this.folder.unit;
        switch (+this.folder.type) {
          case 0: { // int
            this.ico = "Dashboard";
            break;
          }
          case 1: {
            this.ico = "Dashboard";
            break;
          }
          case 2: { // double
            this.ico = "Dashboard";
            break;
          }
          case 3: { // string
            this.ico = "Dashboard";
            break;
          }
          case 4: { // bool
            this.ico = "System Preferences";
            this.switchBool();
            break;
          }
          case 5: { // ??
            this.ico = "Dashboard";
            break;
          }
          case 6: { // ??
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

  setExpressionRunOpposite(){
    this.folder.running = !this.folder.running;
    this._commonService.editExpressionFolder(this.folder)
        .subscribe(
        // data => this.strExpression = JSON.stringify(data),
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
        );
  }

  setBoolValueOpposite(){
    // zmena hodnoty pouze bool
    if(this.folder.type == 4 && this.folder.direction > 0){
      if(this.folder.value == "1"){
        this.folder.value = "0";
      }
      else{
        this.folder.value = "1";
      }

      this._commonService.editTag(this.folder)
      .subscribe(
      // data => this.strCom = JSON.stringify(data),
      error => console.error('Error: ' + error),
      () => console.log('Completed!')
      );
    }

  }

}
