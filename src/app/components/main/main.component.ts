import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { SharingService } from 'app/services/sharing-service.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ViewChild('login') login: TemplateRef<any>;
  @ViewChild('closeModal') closeModal: ElementRef;
  @ViewChild('closeModal2') closeModal2: ElementRef;
  loginDialog: NgbModalRef;

  constructor(private _modalService: NgbModal, private _sharingService: SharingService) { }

  ngOnInit() {
    // this.openLoginDialog();
    this._sharingService.loginObservable.subscribe(x => { this.openLoginDialog() });
    // this._sharingService.callLogin();
  }

  openLoginDialog() {
    this.loginDialog = this._modalService.open(this.login, { size: "lg" });
  }

  closeModalClick() {
    this.loginDialog.close();
  }

}
