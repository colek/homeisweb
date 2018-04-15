import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Tag, Device, DeviceValue, IService } from 'app/classes';
import { SharingService } from './sharing-service.service';

@Injectable()
export class TagService implements IService{
  servicePrefix: string = 'devices/devvalue';

  constructor(private _http: Http, private _sharingService: SharingService) {

  }

  createTag(deviceVal: Tag) {
    let url = this._sharingService.getAddress(this.servicePrefix);
    let headers = this._sharingService.createHeaders();    
    let strDeviceVal = JSON.stringify(deviceVal);
    return this._http.post(url, strDeviceVal, {
      headers: headers
    })
      .map((res: Response) => res.json())
      //.catch(this._sharingService.handleError);
  }

  getTag(tagid: string) {
    let tagAddr = this._sharingService.getAddress(this.servicePrefix) + "/" + tagid;
    return this._http.get(tagAddr)
      .map((res: Response) => res.json())
      .catch(this._sharingService.handleError);
  }
  //-----------------

  saveTag(obj: Tag) {
    let tagAddr = this._sharingService.getAddress(this.servicePrefix + "/" + obj.id);
    let headers = this._sharingService.createHeaders();
    let strObj = JSON.stringify(obj);
    return this._http.put(tagAddr, strObj, {
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
