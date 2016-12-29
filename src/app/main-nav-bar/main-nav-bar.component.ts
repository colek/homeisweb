import { Component, OnInit } from '@angular/core';

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


  constructor() { 
  }

  ngOnInit() {
    this.showRegisters = false;
    this.showLogin = false;
    this.showFolders = false;
    this.showDataTags = false;
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
