import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Register, Folder, Device, DeviceValue } from './classes';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CommonService {

  public urlAddr = 'http://192.168.2.221/api';
  constructor(private _http: Http) {

  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'chyba');
  }

// #region GET
  getFolders(guid: string) {
    let curl = this.urlAddr + "/folder/allitems";
    if(guid != undefined && guid.length > 0){
      curl += "/"+guid;
    }
    return this._http.get(curl)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getFolder(guid: string) {
    let folderAddr = this.urlAddr
      + '/folder/' + guid;
    return this._http.get(folderAddr)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getDevice(guid: string) {
    let folderAddr = this.urlAddr
      + '/onewiredevices/' + guid;
    return this._http.get(folderAddr)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
// #endregion GET

// #region POST

  addFolder(folder: Folder) {    
    let headers = this.getHeaders();
    let strFolder = JSON.stringify(folder);
    return this._http.post(this.urlAddr + '/folder/', strFolder,{
      headers: headers
    })
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  addDevice(device: Device) {    
    let headers = this.getHeaders();
    let strDevice = JSON.stringify(device);
    return this._http.post(this.urlAddr + '/onewiredevices/', strDevice,{
      headers: headers
    })
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  addDeviceValue(deviceVal: DeviceValue) {    
    let headers = this.getHeaders();
    let strDeviceVal = JSON.stringify(deviceVal);
    return this._http.post(this.urlAddr + '/onewiredevices/devvalue/', strDeviceVal,{
      headers: headers
    })
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

// #endregion POST

// #region PUT
  putRegister(write: Register) {
    //var json = JSON.stringify(object);
    //var params = 'json=' + json;
    let writeAddr = this.urlAddr
      + '/modbus/registers/' + write.connector
      + '/' + write.devaddress
      + '/' + write.base
      + '/' + write.value;
    let headers = this.getHeaders();

    return this._http.put(writeAddr, null /*params*/, {
      headers: headers
    })
      .map(res => res.json());
  }
// #endregion PUT

getHeaders(){  
    var headers = new Headers();
    headers.append('Content-type', 'application/json');

    return headers;
}
}
