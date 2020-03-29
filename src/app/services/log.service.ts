import { Injectable } from '@angular/core';
import { SharingService } from 'app/services/sharing-service.service';
import { Http, Response, Headers } from '@angular/http';
import { IService } from 'app/classes';

@Injectable()
export class LogService implements IService {
  servicePrefix: string = 'logs/';

  constructor(private _http: Http, private _sharingService: SharingService) { }

  getLogs() {
    let addr = this._sharingService.getAddress(this.servicePrefix);
    return this._http.get(addr)
      .map((res: Response) => res.json())
      .catch((err: Response) => { return this._sharingService.handleError(err); });
  }

  getFileUrl(logDate:string): string {
    let addr = this._sharingService.getAddress(this.servicePrefix + logDate);
    return addr;
  }

  getLog(logDate: string) {
    let addr = this.getFileUrl(logDate);
    return this._http.get(addr)
      .map((res: Response) => res.json())
      .catch((err: Response) => { return this._sharingService.handleError(err); });
  }
}
