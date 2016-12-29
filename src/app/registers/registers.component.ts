import { Component } from '@angular/core';
import { ModbusService } from './../modbus.service'
import {Register} from './../classes';

@Component({
  selector: 'registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.css'],
  providers: [ModbusService, Register]
})

export class RegistersComponent {
  connectors: any[];
  postData: string;
  getData: string;
  url: string;
  private _getRegister: Register;
  private _postRegister: Register

  constructor(
      private _modbusService: ModbusService) {
    //this.onTestGet();
    this.url = '/api';
    this._getRegister = new Register();
    this._postRegister = new Register();
  }

  onAddressSet() {
    /*this._testService.getFolders()
      .subscribe(
      data => this.folders = data,
      error => console.error('Error: ' + error),
      () => console.log('Completed!')
      );*/
    this._modbusService.urlAddr = this.url;
    this._modbusService.getConnectors()
    .subscribe(
      data => this.connectors = data,
      error => console.error('Error: ' + error),
      () => console.log('Completed!')
      );
  };
    
    
    onPost(){
        this._modbusService.putRegister(this._postRegister)
        .subscribe(
            data => this.postData = JSON.stringify(data),
            error => console.error('Error: ' + error),
            () => console.log('Completed!')
        );
    }

    onGet(){
        this._modbusService.readRegister(this._getRegister)
        .subscribe(
            data => this.getData = JSON.stringify(data),
            error => console.error('Error: ' + error),
            () => console.log('Completed!')
        );
    }

}
