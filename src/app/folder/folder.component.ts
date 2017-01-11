import { Component, OnInit, Input } from '@angular/core';
import { Tag, Folder } from './../classes';
import { CommonService } from './../common.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css'],
  providers: [Tag]
})
export class FolderComponent implements OnInit {

  @Input() folder: Tag;
  @Input() previousfolderId: string;
  ico: string;
  boolIco: string;
  inError: string;

  constructor(private _commonService: CommonService, private router: Router, private _location: Location) {
  }

  ngOnInit() {
    this.switchIco();
    this.inError = (this.folder.error && !this.folder.internal) ? "danger" : "default";
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

  onEdit(event) {
    event.stopPropagation();
    this.router.navigate(['/editfolder/', this.folder.id]);
  }

  switchBool() {
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
  }

  switchIco() {
    switch (this.folder.NodeName) {
      case "value": {
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

}
