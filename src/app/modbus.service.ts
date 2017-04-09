import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Register } from './classes';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ModbusService {

  public urlAddr = 'http://192.168.2.221:82/api';
  constructor(private _http: Http) {

  }

  getConnectors() {
    return this._http.get(this.urlAddr + "/connectors")
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'chyba');
  }

  putRegister(write: Register) {
    //var json = JSON.stringify(object);
    //var params = 'json=' + json;
    let writeAddr = this.urlAddr
      + '/modbus/registers/' + write.connector
      + '/' + write.devaddress
      + '/' + write.base
      + '/' + write.value;
    var headers = new Headers();
    headers.append('Content-type', 'application/x-www-form-urlencoded');

    return this._http.put(writeAddr, null /*params*/, {
      headers: headers
    })
      .map(res => res.json());
  }

  readRegister(read: Register) {
    let readAddr = this.urlAddr
      + '/modbus/registers/' + read.connector
      + '/' + read.devaddress
      + '/' + read.base
      + '/' + read.value;

    return this._http.get(readAddr)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }


  scanAddress(read: Register) {
    let scanAddr = this.urlAddr
      + '/modbus/scan/' + read.connector
      + '/' + read.devaddress;

    return this._http.get(scanAddr)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

}
