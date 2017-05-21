import { Component, OnInit, Input, Pipe } from '@angular/core';
import { Folder } from './../classes';
import { CommonService } from './../common.service';

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

  constructor(private _commonService: CommonService) { }

  ngOnInit() {
    this.Folders = new Array();
    this.strFolders = "";
    this.GetParentFolder(this.CurrentFolderId);
  }

  GetParentFolder(folderid: string){
    this._commonService.getFolder(folderid).subscribe(
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
    if(cFolder.ParentName != "root" && cFolder.ParentId != undefined && cFolder.name != "root"){
       this.GetParentFolder(cFolder.ParentId);
       console.log(cFolder.ParentName);
    }
    
    if(cFolder.ParentName == "root"){
      let xs = new Folder();
      xs.id = "";
      xs.name = cFolder.ParentName;
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
