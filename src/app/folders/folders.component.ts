import { Component, OnInit } from '@angular/core';
import { Tag } from './../classes';
import { CommonService } from './../common.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css'],
  providers: [CommonService]
})
export class FoldersComponent implements OnInit {
  folders: Tag[];
  id: string;
  constructor(private _commonService: CommonService, private route: ActivatedRoute, private router: Router ) {

  }
  
  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.manageId(params['id']))
      .subscribe(
        data => this.folders = this.sortedFolders(data),
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
      )

  }

  onNewExpression() {
    this.router.navigate(['/newexpression', this.id]);
  }

  onNewTag() {

  }

  onNewFolderSet() {
    this.router.navigate(['/newfolder', this.id]);
  }

  sortedFolders(data: Tag[]){
    let folds = data;
    folds = folds.sort((t1, t2) => {
      return(t1.NodeName < t2.NodeName ? -2 :
      (t1.NodeName > t2.NodeName ? 2 : 
      (t1.name < t2.name ? -1 : 
      (t1.name > t2.name ? 1 : 0 ) )));
        });

    if(this.id != undefined && this.id != 'undefined'){
      let tag: Tag;
      tag = new Tag();
      tag.name = "..";
      tag.NodeName = "previous";
      tag.id = this.id;
      folds.unshift(tag);
    }
    return folds;
  }

  manageId(id: string){
    this.id = id;
    return this._commonService.getFolders(id);
  }

}
