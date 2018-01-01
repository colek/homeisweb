import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Register, Tag, Folder, Device, DeviceValue, Expression } from './classes';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CommonService {

  public urlAddr ='https://192.168.2.221:82/api'; //'/api'; //'https://192.168.2.221:82/api';
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

  getExpressions(guid: string) {
    let objAddr = this.urlAddr
      + '/expression/folder/' + guid;
    return this._http.get(objAddr)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getDevices() {
    let folderAddr = this.urlAddr
      + '/onewiredevices';
    return this._http.get(folderAddr)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getDevice(guid: string) {
    let folderAddr = this.urlAddr
      + '/onewiredevices/devvalue/' + guid;
    return this._http.get(folderAddr)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  testExpression(guid: string) {
    let objAddr = this.urlAddr
      + '/expression/run/' + guid;
    return this._http.get(objAddr)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getTag(deviceid: string){
    let addr = this.urlAddr
      + '/onewiredevices/' + deviceid;
    return this._http.get(addr)
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

  addExpression(expr: Expression) {
    let headers = this.createNewHeader();
    this.getHeaders(headers);
    this.createAuthorizationHeader(headers);
    let strObj = JSON.stringify(expr);
    return this._http.post(this.urlAddr + '/expression', strObj, {
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


  editExpression(expr: Expression) {
    let folderAddr = this.urlAddr
      + '/expression/' + expr.id;
    let headers = this.createNewHeader();
    this.getHeaders(headers);
    this.createAuthorizationHeader(headers);
    let strObj = JSON.stringify(expr);
    return this._http.put(folderAddr, strObj, {
      headers: headers
    })
      .map((res: Response) => console.log(JSON.stringify(res)))
      .catch(this.handleError);
  }


  editExpressionFolder(expr: Tag) {
    let folderAddr = this.urlAddr
      + '/expression/' + expr.id;
    let headers = this.createNewHeader();
    this.getHeaders(headers);
    this.createAuthorizationHeader(headers);
    let strObj = JSON.stringify(expr);
    return this._http.put(folderAddr, strObj, {
      headers: headers
    })
      .map((res: Response) => console.log(JSON.stringify(res)))
      .catch(this.handleError);
  }


  editTag(obj: Tag) {
    let strAddr = this.urlAddr
      + '/onewiredevices/devvalue/' + obj.id;
    let headers = this.createNewHeader();
    this.getHeaders(headers);
    this.createAuthorizationHeader(headers);
    let strObj = JSON.stringify(obj);
    return this._http.put(strAddr, strObj, {
      headers: headers
    })
      .map((res: Response) => console.log(JSON.stringify(res)))
      .catch(this.handleError);
  }


  editDevice(obj: Device) {
    let strAddr = this.urlAddr
      + '/onewiredevices/' + obj.Id;
    let headers = this.createNewHeader();
    this.getHeaders(headers);
    this.createAuthorizationHeader(headers);
    let strObj = JSON.stringify(obj);
    return this._http.put(strAddr, strObj, {
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

  deleteExpression(exprId: string) {
    let objAddr = this.urlAddr
      + '/expression/' + exprId;
    let headers = this.createNewHeader();
    this.getHeaders(headers);
    this.createAuthorizationHeader(headers);
    return this._http.delete(objAddr, {
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

  createNewHeader() {
    return new Headers();
  }
}
