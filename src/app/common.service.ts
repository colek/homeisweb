import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Register, Tag, Folder, Device, DeviceValue } from './classes';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CommonService {

  public urlAddr = 'http://192.168.2.221:82/api';
  constructor(private _http: Http) {

  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'chyba');
  }

  // #region GET
  getFolders(guid: string) {
    let curl = this.urlAddr + "/folder/allitems";
    if (guid != undefined && guid.length > 0) {
      curl += "/" + guid;
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
    let headers = this.createNewHeader(); 
    this.getHeaders(headers);
    this.createAuthorizationHeader(headers);
    let strFolder = JSON.stringify(folder);
    return this._http.post(this.urlAddr + '/folder', strFolder, {
      headers: headers
    })
      .map((res: Response) => console.log(JSON.stringify(res)))
      .catch(this.handleError);
  }

  // addTag(folder: Tag) {    
    // let headers = this.createNewHeader(); 
    // this.getHeaders(headers);
    // this.createAuthorizationHeader(headers);
  //   let strFolder = JSON.stringify(folder);
  //   return this._http.post(this.urlAddr + '/folder/', strFolder,{
  //     headers: headers
  //   })
  //     .map((res: Response) => res.json())
  //     .catch(this.handleError);
  // }

  addDevice(device: Device) {
    let headers = this.createNewHeader(); 
    this.getHeaders(headers);
    this.createAuthorizationHeader(headers);
    let strDevice = JSON.stringify(device);
    return this._http.post(this.urlAddr + '/onewiredevices/', strDevice, {
      headers: headers
    })
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  addDeviceValue(deviceVal: DeviceValue) {
    let headers = this.createNewHeader(); 
    this.getHeaders(headers);
    this.createAuthorizationHeader(headers);
    let strDeviceVal = JSON.stringify(deviceVal);
    return this._http.post(this.urlAddr + '/onewiredevices/devvalue/', strDeviceVal, {
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

    let headers = this.createNewHeader(); 
    this.getHeaders(headers);

    return this._http.put(writeAddr, null /*params*/, {
      headers: headers
    })
      .map(res => res.json());
  }


  editFolder(folder: Folder) {
    let folderAddr = this.urlAddr
      + '/folder/' + folder.id;
    let headers = this.createNewHeader(); 
    this.getHeaders(headers);
    this.createAuthorizationHeader(headers);
    let strFolder = JSON.stringify(folder);
    return this._http.put(folderAddr, strFolder, {
      headers: headers
    })
      .map((res: Response) => console.log(JSON.stringify(res)))
      .catch(this.handleError);
  }
  // #endregion PUT

  // #region DELETE

  deleteFolder(folderId: string) {
    let folderAddr = this.urlAddr
      + '/folder/' + folderId;
    let headers = this.createNewHeader(); 
    this.getHeaders(headers);
    this.createAuthorizationHeader(headers);
    return this._http.delete(folderAddr, {
      headers: headers
    })
      .map((res: Response) => console.log(JSON.stringify(res)))
      .catch(this.handleError);
  }

  // #endregion DELETE



  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Basic ' +
      btoa('a:a'));
  }
  getHeaders(headers: Headers) {
    headers.append('Content-type', 'application/json');
  }

  createNewHeader(){
    return new Headers();
  }
}
