import { Component } from '@angular/core';
import { ModbusService } from 'app/modbus.service'
import { Register } from 'app/classes';
import { SharingService } from 'app/services/sharing-service.service';

@Component({
    selector: 'registers',
    templateUrl: './registers.component.html',
    styleUrls: ['./registers.component.css'],
    providers: [ModbusService]
})

export class RegistersComponent {
    connectors: any[];
    postData: string;
    getData: string;
    url: string;
    public _getRegister: Register;
    public _postRegister: Register

    constructor(
        private _modbusService: ModbusService,
        private _sharingSrvice: SharingService) {
        //this.onTestGet();
        this.url = this._sharingSrvice.urlAddr;
        this._getRegister = new Register();
        this._postRegister = new Register();
        this.addressSet();
    }

    onAddressSet() {
        /*this._testService.getFolders()
          .subscribe(
          data => this.folders = data,
          error => {},
          () => console.log('Completed!')
          );*/
        this.addressSet();
    };

    addressSet() {
        this._sharingSrvice.urlAddr = this.url;
        this._modbusService.getConnectors()
            .subscribe(
                data => this.connectors = data,
                error => {
                    { };
                    this.getData = error;
                },
                () => console.log('Completed!')
            );
    }


    onPost() {
        this._modbusService.putRegister(this._postRegister)
            .subscribe(
                data => this.postData = JSON.stringify(data),
                error => {
                    { };
                    this.getData = error;
                },
                () => console.log('Completed!')
            );
    }

    onGet() {
        this._modbusService.readRegister(this._getRegister)
            .subscribe(
                data => this.getData = JSON.stringify(data),
                error => {
                    { };
                    this.getData = error;
                },
                () => console.log('Completed!')
            );
    }
    onScan() {
        this._modbusService.scanAddress(this._getRegister)
            .subscribe(
                data => this.getData = JSON.stringify(data),
                error => {
                    { };
                    this.getData = error;
                },
                () => console.log('Completed!')
            );
    }
}
