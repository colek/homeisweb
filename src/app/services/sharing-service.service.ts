import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import { Tag, Device } from 'app/classes';

@Injectable()
export class SharingService {

  Login: string;
  Pwd: string;
  public urlAddr ='/api'; //'/api'; //'https://192.168.2.221:82/api';

 
  public selectedTag: Tag;
  public selectedDevice: Device;
  public selectedId: string;

  constructor( ) { 

  }

  public setTag(tag: Tag){
      this.selectedTag = tag;
     // this.onChange.trigger(tag);
  }
  public setDevice(device: Device){
      this.selectedDevice = device;
     // this.onChange.trigger(device);
  }
    getTag<Tag> () {
      return this.selectedTag;
    }
    
    getDevice<Device> () {
      return this.selectedDevice;
    }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'chyba');
  }



  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Basic ' +
      btoa(this.Login + ':' + this.Pwd));
  }
  getHeaders(headers: Headers) {
    headers.append('Content-type', 'application/json');
  }

  createNewHeader() {
    return new Headers();
  }

  getAddress(adr: string){
    return this.urlAddr + '/' + adr;
  }

  createHeaders(){
    let headers = this.createNewHeader();
    this.getHeaders(headers);
    this.createAuthorizationHeader(headers);

    return headers;
  }

}
