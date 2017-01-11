import { Component, OnInit } from '@angular/core';
import { Folder } from './../classes';
import { CommonService } from './../common.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'newfolder',
  templateUrl: './newfolder.component.html',
  styleUrls: ['./newfolder.component.css'],
  providers: [Folder, CommonService]
})
export class NewfolderComponent implements OnInit {
  folder: Folder;
  strFolder: string;
  header: string;
  isNew: boolean;
  id: string;

  constructor(private _commonService: CommonService,
    private route: ActivatedRoute,
    private _location: Location) {
  }

  ngOnInit() {
    let parentId = this.route.snapshot.params['parentId'];
    this.id = this.route.snapshot.params['id'];
    this.loadNewFolder(null);

    if (parentId != undefined) {
      this.header = "Nový adresář";
      this.loadNewFolder(parentId);
    }
    else if (this.id != undefined) {
      this.header = "Editace adresáře";
      this.route.params
        .switchMap((params: Params) => this.loadFolder(params['id']))
        .subscribe(
        data => this.setFolder(data),
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
        );
    }
  }

  loadNewFolder(parentId: string) {
    this.folder = new Folder();
    this.folder.parentId = (parentId != undefined && parentId != 'undefined')?parentId:null;
    this.folder.type = null;
  }

  loadFolder(id: string) {
    return this._commonService.getFolder(id);
  }

  setFolder(folder: Folder[]) {
    if (folder.length > 0) {
      this.folder = folder[0];
    }
  }

  onSave() {
    this._commonService.addFolder(this.folder)
        .subscribe(
            data => this.strFolder = JSON.stringify(data),
            error => console.error('Error: ' + error),
            () => console.log('Completed!')
        );
  }

  

  onBack() {
    this._location.back();
  }

  onDelete() {
    this._commonService.deleteFolder(this.id);
  }

}
