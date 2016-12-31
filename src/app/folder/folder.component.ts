import { Component, OnInit, Input } from '@angular/core';
import {Folder} from './../classes';
import { CommonService } from './../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css'],
  providers: [Folder]
})
export class FolderComponent implements OnInit {

  @Input() folder: Folder; 
  @Input() folderId: string;
  test: string;
 

  constructor(private _commonService: CommonService, private router: Router) {
  }

  ngOnInit() {
  }

  onClick(event){
    console.log('folder click');
    this.router.navigate(['/folders/', this.folderId]);
  }

  onEdit(event){
    console.log('edit click');
    event.stopPropagation();
  }

}
