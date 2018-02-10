import {Component, Injectable} from '@angular/core'

export class Register {
    public connector: string;
    public devaddress: number;
    public base: number;
    public value: number;
    constructor(
    ) {
    }
}

export class Folder {
    public type: string;
    public name: string;
    public ParentId: string;
    public ParentName: string;
    public id: string;
    constructor() {

    }
}

export class Device {
    public Name: string;
    public Id: string;
    public Address: string;
    public ConnectionName: string;
    public Internal: boolean;
    public ScanPeriodMs: number;
    public Enabled: boolean;
    public Tags: Tag[];
    constructor() {

    }
}

export class Tag {
    public name: string;
    public id: string;
    public DirValueId: string;
    public ParentId: string;
    public NodeName: string;
    public address: string;
    public type: number;
    public direction: number;
    public value: string;
    public error: boolean;
    public force: boolean;
    public unit: string;
    public addressName: string;
    public internal: boolean;
    public running: boolean;
    constructor() {

    }
}

export class DeviceValue {
    public name: string;
    public parentid: string;
    public type: number;
    public logged: boolean;
    public direction: number;
    public error: boolean;
    public force: boolean;
    public unit: string;
    public internal: boolean;
    public isEnabled: boolean;
    public oldvalue: Object;
    public setOutputState: number;
    public __ko_mapping__: Object;
    constructor() {

    }
}

export class Expression {
    public parentId: string;
    public id: string;
    public expression: string;
    public running: boolean;
    public description: string;
    public name: string;
    public errormessage: string;
    public NodeName: string;
}

export class SelectObj{
    public name:string;
    public value: any;

    constructor(name: string, value: any) {
        this.name = name;
        this.value = value
    }
}

export class TagToFolder{
    public DevValueId: string;
}

export interface IService{
    servicePrefix: string;
}

// interface IChangedEvent<T> {
//     on(handler: { (data?: T): void }) : void;
//     //off(handler: { (data?: T): void }) : void;
// }

// class ChangedEvent<T> implements IChangedEvent<T> {
//     private handlers: { (data?: T): void; }[] = [];

//     public on(handler: { (data?: T): void }) : void {
//         this.handlers.push(handler);
//     }

//     // public off(handler: { (data?: T): void }) : void {
//     //     this.handlers = this.handlers.filter(h => h !== handler);
//     // }

//     public trigger(data?: T) {
//         this.handlers.slice(0).forEach(h => h(data));
//     }

//     public expose() : IChangedEvent<T> {
//         return this;
//     }
// }


// @Injectable()
// export class DetailSharingService{
//     //private readonly onChange = new ChangedEvent<object>();
//     //public get Changed() { return this.onChange.expose(); }

//     public selectedTag: Tag;
//     public selectedDevice: Device;
//     public selectedId: string;

//     public setTag(tag: Tag){
//         this.selectedTag = tag;
//        // this.onChange.trigger(tag);
//     }
//     public setDevice(device: Device){
//         this.selectedDevice = device;
//        // this.onChange.trigger(device);
//     }


//   constructor(){
//     this.selectedTag = null;
//     this.selectedDevice = null;
//   }
//   getTag<Tag> () {
//     return this.selectedTag;
//   }
  
//   getDevice<Device> () {
//     return this.selectedDevice;
//   }
// }