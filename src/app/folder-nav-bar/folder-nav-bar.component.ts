import { Component, OnInit, Input, Pipe } from '@angular/core';
import { Folder } from 'app/classes';
import { FolderService } from 'app/services/folder.service';

@Component({
  selector: 'folder-nav',
  templateUrl: './folder-nav-bar.component.html',
  styleUrls: ['./folder-nav-bar.component.css'],
  providers: [Folder]
})
export class FolderNavBarComponent implements OnInit {

  @Input() CurrentFolderId: string;
  Folders: Array<Folder>;
  strFolders: string;

  constructor(private _folderService: FolderService) { }

  ngOnInit() {
    this.Folders = new Array();
    this.strFolders = "";
    this.GetParentFolder(this.CurrentFolderId);
  }

  GetParentFolder(folderid: string){
    this._folderService.getFolder(folderid).subscribe(
        data => this.addFolder(data),
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
        );
  }

  addFolder(folder: Folder[]){
    if(folder.length <= 0) {
      return;
    }
    let cFolder:Folder = folder[0];
// this.strFolders = JSON.stringify(cFolder);

    if(cFolder.name == "root"){
      cFolder.id = "";
    }
    this.Folders.push(cFolder);
    if(cFolder.parentName != "root" && cFolder.parentId != undefined && cFolder.name != "root"){
       this.GetParentFolder(cFolder.parentId);
       console.log(cFolder.parentName);
    }
    
    if(cFolder.parentName == "root"){
      let xs = new Folder();
      xs.id = "";
      xs.name = cFolder.parentName;
      this.Folders.push(xs);
      this.Folders.reverse();
    }
  }

}

// @Pipe({
//   name: 'reverse'
// })
// export class ReversePipe {
//   transform(value) {
//     return value.slice().reverse();
//   }
// }
