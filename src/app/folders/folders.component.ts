import { Component, OnInit } from '@angular/core';
import {Folder} from './../classes';
import { CommonService } from './../common.service'


@Component({
  selector: 'folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css'],
  providers: [CommonService]
})
export class FoldersComponent implements OnInit {
  folders: Folder[];

  constructor(private _commonService: CommonService) { }

  ngOnInit() {
    this._commonService.getFolders()
    .subscribe(
      data => this.folders = data,
      error => console.error('Error: ' + error),
      () => console.log('Completed!')
      );
  }

  onNewExpression(){

  }

  onNewTag(){

  }

  onNewFolderSet(){

  }

}
