import { Injectable } from '@angular/core';
import { SharingService } from 'app/services/sharing-service.service';
import { Http, Response, Headers } from '@angular/http';
import { Expression, Tag, IService } from 'app/classes';

@Injectable()
export class ExpressionService implements IService {
  servicePrefix: string = 'expression/';

  constructor(private _http: Http, private _sharingService: SharingService) { }


  getExpressions(guid: string) {
    let objAddr = this._sharingService.getAddress(this.servicePrefix + 'folder/' + guid);
    return this._http.get(objAddr)
      .map((res: Response) => res.json())
      .catch((err: Response) => { return this._sharingService.handleError(err); });
  }

  testExpression(guid: string) {
    let objAddr = this._sharingService.getAddress(this.servicePrefix + 'run/' + guid);
    return this._http.get(objAddr)
      .map((res: Response) => res.json())
      .catch((err: Response) => { return this._sharingService.handleError(err); });
  }

  addExpression(expr: Expression) {
    let headers = this._sharingService.createHeaders();
    let strObj = JSON.stringify(expr);
    return this._http.post(this._sharingService.getAddress(this.servicePrefix), strObj, {
      headers: headers
    })
      .map((res: Response) => console.log(JSON.stringify(res)))
      .catch((err: Response) => { return this._sharingService.handleError(err); });
  }

  editExpression(expr: Expression) {
    let folderAddr = this._sharingService.getAddress(this.servicePrefix + expr.id);
    let headers = this._sharingService.createHeaders();
    let strObj = JSON.stringify(expr);
    return this._http.put(folderAddr, strObj, {
      headers: headers
    })
      .map((res: Response) => console.log(JSON.stringify(res)))
      .catch((err: Response) => { return this._sharingService.handleError(err); });
  }


  editExpressionFolder(expr: Tag) {
    let folderAddr = this._sharingService.getAddress(this.servicePrefix + expr.id);
    let headers = this._sharingService.createHeaders();
    let strObj = JSON.stringify(expr);
    return this._http.put(folderAddr, strObj, {
      headers: headers
    })
      .map((res: Response) => console.log(JSON.stringify(res)))
      .catch((err: Response) => { return this._sharingService.handleError(err); });
  }

  deleteExpression(exprId: string) {
    let objAddr = this._sharingService.getAddress(this.servicePrefix + exprId);
    let headers = this._sharingService.createHeaders();
    return this._http.delete(objAddr, {
      headers: headers
    })
      .map((res: Response) => console.log(JSON.stringify(res)))
      .catch((err: Response) => { return this._sharingService.handleError(err); });
  }

}
