import { Component, OnInit } from '@angular/core';
import { SharingService } from 'app/services/sharing-service.service';
import { ModbusService } from 'app/modbus.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { LogService } from '../services/log.service';

@Component({
  selector: 'main-nav-bar',
  templateUrl: './main-nav-bar.component.html',
  styleUrls: ['./main-nav-bar.component.css']
})
export class MainNavBarComponent implements OnInit {

  public showRegisters: boolean;
  public showLogin: boolean;
  public showFolders: boolean;
  public showDataTags: boolean;
    
  timer;
  private sub: Subscription;  
  public boolIco: string;


  constructor(private _sharingService: SharingService, 
    private _logService: LogService) {     
  }

  public Login()
  {
      return this._sharingService.Login;
  }

  checkOnline(t) {
    this._logService.getLogs()
      .subscribe(
      data => { },
      error => {
        console.error('Error: ' + error);
        this.boolIco = "Light Bulb Off";
      },
      () => { this.boolIco = "Light Bulb On"; }
      );
  }

  ngOnInit() {
    this.showRegisters = false;
    this.showLogin = false;
    this.showFolders = false;
    this.showDataTags = false;

    this.timer = Observable.timer(1000, 10000);

    this.boolIco = "Light Bulb Off";
    this.sub = this.timer.subscribe(t => this.checkOnline(t));
  }

  onShowRegisters(){    
    this.showRegisters = true;
    this.showLogin = false;
    this.showFolders = false;
    this.showDataTags = false;
  }

  onShowLogin(){
    this.showRegisters = false;
    this.showLogin = true;
    this.showFolders = false;
    this.showDataTags = false;
  }

  onShowFolders(){  
    this.showRegisters = false;
    this.showLogin = false;
    this.showFolders = true;
    this.showDataTags = false;
  }

  onShowDataTags(){
    this.showRegisters = false;
    this.showLogin = false;
    this.showFolders = false;
    this.showDataTags = true;
  }

}
