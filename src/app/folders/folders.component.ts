import { Component, OnInit, OnChanges } from '@angular/core';
import {Folder} from './../classes';
import { CommonService } from './../common.service'
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css'],
  providers: [CommonService]
})
export class FoldersComponent implements OnChanges, OnInit {
  folders: Folder[];
  id: string;

  constructor(private _commonService: CommonService, private route: ActivatedRoute,) { 
    
    }

    ngOnChanges(){
let id = this.route.snapshot.params['id'];
    this._commonService.getFolders(id)
    .subscribe(
      data => this.folders = data,
      error => console.error('Error: ' + error),
      () => console.log('Completed! '+ id)
      );
    }
ngOnInit(){
  let id:string;
      this.route.params
        .switchMap(this._commonService.getFolders(id)
    .subscribe(
      data => this.folders = data,
      error => console.error('Error: ' + error),
      () => console.log('Completed! '+ id)
      ))
    
}

  onNewExpression(){

  }

  onNewTag(){

  }

  onNewFolderSet(){

  }

}
