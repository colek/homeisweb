import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
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
  timer;
  tick: number;
  tick2: number;
  private sub: Subscription;
  refresh: string;
  constructor(private _commonService: CommonService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.manageId(params['id']))
      .subscribe(
      data => this.folders = this.sortedFolders(data),
      error => console.error('Error: ' + error),
      () => console.log('Completed!')
      )
    this.tick = 0;
    this.tick2 = -1;
    this.timer = Observable.timer(1000, 5000);
    //this.sub = this.timer.subscribe(t => this.refreshFolder(t));

    this.refresh = "Off";

  }

  ngOnDestroy() {
    if (this.sub != undefined) {
      this.sub.unsubscribe();
    }
  }

  onNewExpression() {
    this.router.navigate(['/newexpression', this.id]);
  }

  onNewTag() {

  }

  onNewFolderSet() {
    this.router.navigate(['/newfolder', this.id]);
  }

  sortedFolders(data: Tag[]) {
    let folds = data;
    folds = folds.sort((t1, t2) => {
      return (t1.NodeName < t2.NodeName ? -2 :
        (t1.NodeName > t2.NodeName ? 2 :
          (t1.name < t2.name ? -1 :
            (t1.name > t2.name ? 1 : 0))));
    });

    if (this.id != undefined && this.id != 'undefined') {
      let tag: Tag;
      tag = new Tag();
      tag.name = "..";
      tag.NodeName = "previous";
      tag.id = this.id;
      folds.unshift(tag);
    }
    return folds;
  }

  refreshFolder(t) {
    this._commonService.getFolders(this.id)
      .subscribe(
      data => this.folders = this.sortedFolders(data),
      error => console.error('Error: ' + error),
      () => {
        console.log('Completed!');
        this.tick2 = this.tick2 + 1;
      }
      );
    this.tick = t;
  }

  manageId(id: string) {
    this.id = id;
    return this._commonService.getFolders(id);
  }

  onSwitchRefresh() {
    if (this.refresh == "On") {
      this.refresh = "Off";
      this.tick2 = this.tick = 0;
      this.sub.unsubscribe();
    }
    else {
      this.refresh = "On";
      this.sub = this.timer.subscribe(t => this.refreshFolder(t));
    }
  }

}
