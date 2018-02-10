import { Injectable } from '@angular/core';
import { SharingService } from 'app/services/sharing-service.service';
import { Http, Response, Headers } from '@angular/http';
import { IService, Folder } from 'app/classes';

@Injectable()
export class FolderService implements IService {
  servicePrefix: string = 'folder/';

  constructor(private _http: Http,private _sharingService: SharingService) { }

  getFolders(guid: string) {
    let curl = this._sharingService.getAddress(this.servicePrefix + "allitems/");
    if (guid != undefined && guid.length > 0) {
      curl += "/" + guid;
    }
    return this._http.get(curl)
      .map((res: Response) => res.json())
      .catch(this._sharingService.handleError);
  }

  getFolder(guid: string) {
    let folderAddr = this._sharingService.getAddress(this.servicePrefix + guid);
    return this._http.get(folderAddr)
      .map((res: Response) => res.json())
      .catch(this._sharingService.handleError);
  }

  addFolder(folder: Folder) {
    let headers = this._sharingService.createHeaders();
    let strFolder = JSON.stringify(folder);
    return this._http.post(this._sharingService.getAddress(this.servicePrefix), strFolder, {
      headers: headers
    })
      .map((res: Response) => console.log(JSON.stringify(res)))
      .catch(this._sharingService.handleError);
  }

  addTagToFolder(folderId, TagToFolder){    
    let headers = this._sharingService.createHeaders();
    let strVal = JSON.stringify(TagToFolder);
    return this._http.put(this._sharingService.getAddress(this.servicePrefix + 'valueid/' + folderId), strVal, { //https://192.168.2.221:82/api/folder/valueid/cec19e4e-bb1e-4efa-9311-f9f6a4ae9e18/
      headers: headers
    })
      .map(res => res.json())
      .catch(this._sharingService.handleError);
  }

  editFolder(folder: Folder) {
    let folderAddr = this._sharingService.getAddress(this.servicePrefix + folder.id);
    let headers = this._sharingService.createHeaders();
    let strFolder = JSON.stringify(folder);
    return this._http.put(folderAddr, strFolder, {
      headers: headers
    })
      .map((res: Response) => console.log(JSON.stringify(res)))
      .catch(this._sharingService.handleError);
  }

  deleteFolder(folderId: string) {
    let folderAddr = this._sharingService.getAddress(this.servicePrefix + folderId);
    let headers = this._sharingService.createHeaders();
    return this._http.delete(folderAddr, {
      headers: headers
    })
      .map((res: Response) => console.log(JSON.stringify(res)))
      .catch(this._sharingService.handleError);
  }

}
