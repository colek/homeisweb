import { Component, OnInit } from '@angular/core';
import { Tag, SelectObj } from './../classes';
import { CommonService } from './../common.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'tag-item',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
  providers: [Tag, CommonService]
})
export class TagComponent implements OnInit {

  Tag: Tag;
  isNew: boolean;
  id: string;
  strCom: string;
  btnInternalClass: string;
  header: string;
  isInternalText: string;
  typeSelect: SelectObj[];

  constructor(private _commonService: CommonService,
    private route: ActivatedRoute,
    private _location: Location) { }

  ngOnInit() {
    this.loadTypes();
    this.id = this.route.snapshot.params['id'];

    if (this.id == undefined) {
      this.isNew = true;
      this.header = "Nový tag";
    }
    else {
      this.isNew = false;
      this.header = "Editace tagu";
      // this.route.params
      //   .switchMap((params: Params) => this.loadTag(this.id))
      //   .subscribe(
      //   data => this.setTag(<Tag>data),
      //   error => console.error('Error: ' + error),
      //   () => console.log('Completed!')
      //   );
    }

    this.isInternalText = (this.Tag.internal) ? "Internal" : "Internal off";
    this.btnInternalClass = (this.Tag.internal) ? "btn-success" : "btn-warning";
  }

  loadTag(id: string) {
    // return this._commonService.getTag(id);
  }

  setTag(tag: Tag) {
    
        this.Tag = tag;
        this.strCom = JSON.stringify(tag);
        return;

  }

  onSave() {
      // this._commonService.editTag(this.Tag)
      //   .subscribe(
      //   data => this.strCom = JSON.stringify(data),
      //   error => console.error('Error: ' + error),
      //   () => console.log('Completed!')
      //   );
  }



  onBack() {
    this._location.back();
  }

  onDelete() {
    // this._commonService.deleteTag(this.id)
    //   .subscribe(
    //   data => this.strCom = JSON.stringify(data),
    //   error => console.error('Error: ' + error),
    //   () => console.log('Delete clicked!')
    //   );
  }
  

  // switchOnOff() {
  //   this.expression.running = !this.expression.running;

  //   this.isRunningText = (this.expression.running) ? "Zapnuto" : "Vypnuto";
  //   this.btnRunningClass = (this.expression.running) ? "btn-success" : "btn-warning";
  // }

  loadTypes(){
    this.typeSelect = new Array();

    this.typeSelect.push(new SelectObj("Unknown", -1));
    this.typeSelect.push(new SelectObj("Int", 0));
    this.typeSelect.push(new SelectObj("UInt", 1));
    this.typeSelect.push(new SelectObj("Double", 2));
    this.typeSelect.push(new SelectObj("String", 3));
    this.typeSelect.push(new SelectObj("Bool", 4));
  }

}
