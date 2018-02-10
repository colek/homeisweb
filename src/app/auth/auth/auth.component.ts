import { Component, OnInit } from '@angular/core';
import { SharingService } from 'app/services/sharing-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  login: string;
  pwd: string;

  constructor(private _sharingService: SharingService) { }

  ngOnInit() {
  }

  onLogin(){
    this._sharingService.Login = this.login;
    this._sharingService.Pwd=this.pwd;
  }

}
