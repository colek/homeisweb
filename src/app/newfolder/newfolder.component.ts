import { Component, OnInit } from '@angular/core';
import { Folder } from 'app/classes';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FolderService } from 'app/services/folder.service';
import { SharingService } from 'app/services/sharing-service.service';

@Component({
  selector: 'newfolder',
  templateUrl: './newfolder.component.html',
  styleUrls: ['./newfolder.component.css'],
  providers: [Folder]
})
export class NewfolderComponent implements OnInit {
  folder: Folder;
  strFolder: string;
  header: string;
  isNew: boolean;
  id: string;

  constructor(private _folderService: FolderService,
    private route: ActivatedRoute,
    private _sharingService: SharingService,
    private _location: Location) {
  }

  ngOnInit() {
    let parentId = this.route.snapshot.params['parentId'];
    this.id = this.route.snapshot.params['id'];
    this.loadNewFolder(null);

    if (this.id == undefined) {
      this.isNew = true;
      this.header = "Nový adresář";
      this.loadNewFolder(parentId);
    }
    else {
      this.isNew = false;
      this.header = "Editace adresáře";
      this.route.params
        .switchMap((params: Params) => this.loadFolder(params['id']))
        .subscribe(
          data => this.setFolder(data),
          error => { },
          () => console.log('Completed!')
        );
    }
  }

  loadNewFolder(parentId: string) {
    this.folder = new Folder();
    this.folder.parentId = (parentId != undefined && parentId != 'undefined') ? parentId : null;
    this.folder.type = null;
  }

  loadFolder(id: string) {
    return this._folderService.getFolder(id);
  }

  setFolder(folder: Folder[]) {
    if (folder.length > 0) {
      this.folder = folder[0];
    }
  }

  onSave() {
    if (this.isNew) {
      this._folderService.addFolder(this.folder)
        .subscribe(
          data => this.strFolder = JSON.stringify(data),
          error => { },
          () => console.log('Completed!')
        );
    }
    else {
      this._folderService.editFolder(this.folder)
        .subscribe(
          data => this.strFolder = JSON.stringify(data),
          error => { },
          () => console.log('Completed!')
        );
    }
  }



  onBack() {
    this._location.back();
  }

  onDelete() {
    this._folderService.deleteFolder(this.id)
      .subscribe(
        data => this.strFolder = JSON.stringify(data),
        error => { },
        () => console.log('Delete clicked!')
      );
  }

}
