import { Injectable } from '@angular/core';
import { SharingService } from 'app/services/sharing-service.service';
import { Http, Response, Headers } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import { Register, IService } from 'app/classes';


@Injectable()
export class ModbusService implements IService {
  servicePrefix: string = 'modbus/';

  //public urlAddr = 'https://192.168.2.221:82/api';
  constructor(private _http: Http,private _sharingService: SharingService) {

  }

  getConnectors() {
    return this._http.get(this._sharingService.getAddress('connectors/'))
      .map((res: Response) => res.json())
      .catch(this._sharingService.handleError);
  }

  putRegister(write: Register) {
    //var json = JSON.stringify(object);
    //var params = 'json=' + json;
    let writeAddr = this._sharingService.getAddress(this.servicePrefix
      + 'registers/' + write.connector
      + '/' + write.devaddress
      + '/' + write.base
      + '/' + write.value);
    var headers = this._sharingService.createHeaders(); //new Headers();
    //headers.append('Content-type', 'application/x-www-form-urlencoded');

    return this._http.put(writeAddr, null /*params*/, {
      headers: headers
    })
      .map(res => res.json());
  }

  readRegister(read: Register) {
    let readAddr = this._sharingService.getAddress(this.servicePrefix
      + '/registers/' + read.connector
      + '/' + read.devaddress
      + '/' + read.base
      + '/' + read.value);

    return this._http.get(readAddr)
      .map((res: Response) => res.json())
      .catch(this._sharingService.handleError);
  }


  scanAddress(read: Register) {
    let scanAddr = this._sharingService.getAddress(this.servicePrefix
      + '/scan/' + read.connector
      + '/' + read.devaddress);

    return this._http.get(scanAddr)
      .map((res: Response) => res.json())
      .catch(this._sharingService.handleError);
  }

}
