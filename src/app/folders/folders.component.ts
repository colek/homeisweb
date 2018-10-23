import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { Tag, TagToFolder } from 'app/classes';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';
import { FolderService } from 'app/services/folder.service';
import { SharingService } from 'app/services/sharing-service.service';


@Component({
  selector: 'folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css'],
  providers: []
})
export class FoldersComponent implements OnInit {
  folders: Tag[];
  id: string;
  rootFolderId: string;
  timer;
  tick: number;
  tick2: number;
  private sub: Subscription;
  refresh: string;
  refreshButtonType: string;
  @ViewChild('closeModal') closeModal: ElementRef;

  constructor(private _folderService: FolderService,
    private route: ActivatedRoute,
    private router: Router,
    private _sharingService: SharingService) {
  }

  ngOnInit() {

    this.route.params
      .switchMap((params: Params) => this.manageId(params['id']))
      .subscribe(
        data => this.folders = this.sortedFolders(data),
        error => { },
        () => console.log('Completed!')
      )
    this.tick = 0;
    this.tick2 = -1;
    this.timer = Observable.timer(1000, 500);

    this.refresh = "On";
    this.refreshButtonType = "light";
    this.sub = this.timer.subscribe(t => this.refreshFolder(t));

  }

  ngOnDestroy() {
    if (this.sub != undefined) {
      this.sub.unsubscribe();
    }
  }

  onNewExpression() {
    let cParentId = (this.id != undefined) ? this.id : this.folders[0].parentId;
    console.log("NewExpression clicked, thisId: " + cParentId);
    this.router.navigate(['/newexpression', cParentId]);
  }

  onNewTag() {

  }

  // TODO spatne se vklada nadrazena slozka!!! 
  onNewFolderSet() {
    let cParentId = (this.id != undefined) ? this.id : this.folders[0].parentId;
    console.log("NewFolder clicked, thisId: " + cParentId);
    if (cParentId == undefined)
      this.router.navigate(['/newfolder']);
    else
      this.router.navigate(['/newfolder', cParentId]);
  }

  sortedFolders(data: Tag[]) {
    let folds = data;
    folds = folds.sort((t1, t2) => {
      return (t1.nodeName < t2.nodeName ? -2 :
        (t1.nodeName > t2.nodeName ? 2 :
          (t1.name < t2.name ? -1 :
            (t1.name > t2.name ? 1 : 0))));
    });

    if (this.id != undefined && this.id != 'undefined') {
      let tag: Tag;
      tag = new Tag();
      tag.name = "..";
      tag.nodeName = "previous";
      tag.id = this.id;
      folds.unshift(tag);
    }
    return folds;
  }

  refreshFolder(t) {
    this._folderService.getFolders(this.id)
      .subscribe(
        data => this.folders = this.sortedFolders(data),
        error => {
          { };
          this.refreshButtonType = 'danger';
        },
        () => {
          console.log('Completed!');
          //this.tick2 = this.tick2 + 1;
          if (this.refresh == 'On') {
            this.refreshButtonType = 'success';
          }
          else {
            this.refreshButtonType = 'danger';
          }
        }
      );
    //this.tick = t;
  }

  manageId(id: string) {
    this.id = id;
    return this._folderService.getFolders(id);
  }

  onSwitchRefresh() {
    if (this.refresh == "On") {
      this.refresh = "Off";
      //this.tick2 = -1;
      //this.tick = 0;
      this.sub.unsubscribe();
      this.refreshButtonType = 'danger';
    }
    else {
      this.refresh = "On";
      this.sub = this.timer.subscribe(t => this.refreshFolder(t));
    }
  }

  setTagToFolder(ttf: TagToFolder) {
    this._folderService.addTagToFolder(this.id, ttf).subscribe(
      // data => this.strCom = JSON.stringify(data),
      error => { },
      () => {
        console.log('Completed!');
        this.closeModalClick();
      }
    );
  }

  addNewTagToFolder(event) {
    let tag: Tag;

    tag = event;

    let ttf: TagToFolder;
    ttf = new TagToFolder();

    if (tag == null || tag.id == '') return;

    ttf.devValueId = tag.id;

    this.setTagToFolder(ttf);
  }

  closeModalClick() {
    this.closeModal.nativeElement.click();
  }



}
