import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/catch';

@Injectable()
export class TestServiceService {

  private urlAddr = 'http://192.168.2.221:82/api';   
  private urlOld = 'http://192.168.2.221/api';   
    constructor( private _http: Http)
    {

    }
        
    getConnectors(){
        return this._http.get(this.urlAddr + "/connectors")
        .map((res:Response) => res.json())
        .catch(this.handleError);
    }
        
    getFolders(){
        return this._http.get(this.urlOld + "/folder/allitems")
        .map(res => res.json())
        .catch(this.handleError);
    }

    handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error ||'chyba');
    }

    postJSON(object: any) {
        var json = JSON.stringify(object);
        var params = 'json=' + json;
        var headers = new Headers();
        headers.append('Content-type', 'application/x-www-form-urlencoded');

        return this._http.post(this.urlAddr, params, {
            headers: headers
        })
            .map(res => res.json());
    }
}

