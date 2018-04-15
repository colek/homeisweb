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

export enum TagType {
    Unknown = -1,
	Int = 0,
	Uint = 1,
	Double = 2,
	String = 3,
	Bool = 4,
	Enum = 5,
	Email = 6
}

export class Tag {
    public name: string;
    public id: string;
    public DirValueId: string;
    public parentId: string;
    public NodeName: string;
    public address: string;
    public type: TagType;
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