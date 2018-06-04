import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Tag, Device, DeviceValue, IService } from 'app/classes';
import { SharingService } from './sharing-service.service';

@Injectable()
export class DevicesService implements IService{
  servicePrefix: string = 'onewiredevices/';

  constructor(private _http: Http, private _sharingService: SharingService) {

  }

  getDevices() {
    let folderAddr = this._sharingService.getAddress(this.servicePrefix);
    return this._http.get(folderAddr)
      .map((res: Response) => res.json())
      .catch(this._sharingService.handleError);
  }

  getDevice(deviceid: string) {
    let folderAddr = this._sharingService.getAddress(this.servicePrefix +deviceid);
    return this._http.get(folderAddr)
      .map((res: Response) => res.json())
      .catch(this._sharingService.handleError);
  }

  getTag(deviceid: string){
    let addr = this._sharingService.getAddress(this.servicePrefix + deviceid);
    return this._http.get(addr)
      .map((res: Response) => res.json())
      .catch(this._sharingService.handleError);
  }

  //-----------------
  

  addDevice(device: Device) {
    let headers = this._sharingService.createHeaders();
    let strDevice = JSON.stringify(device);
    return this._http.post(this._sharingService.getAddress(this.servicePrefix), strDevice, {
      headers: headers
    })
      .map((res: Response) => res.json())
      .catch(this._sharingService.handleError);
  }

  
  //--------------------
  editDevice(obj: Device) {
    let strAddr = this._sharingService.getAddress(this.servicePrefix + obj.id);
    let headers = this._sharingService.createHeaders();
    let strObj = JSON.stringify(obj);
    return this._http.put(strAddr, strObj, {
      headers: headers
    })
      .map((res: Response) => console.log(JSON.stringify(res)))
      .catch(this._sharingService.handleError);
  }

  
  //---------------------DELETE 

  /// api/onewiredevices/folder/e23ee00f-348b-4542-9ce0-690d7229d27b/
  deleteTagFromFolder(tagId: string){
    let objAddr = this._sharingService.getAddress(this.servicePrefix + 'folder/' + tagId);
    let headers = this._sharingService.createHeaders();
    return this._http.delete(objAddr, {
      headers: headers
    })
      .map((res: Response) => console.log(JSON.stringify(res)))
      .catch(this._sharingService.handleError);
  }

}
