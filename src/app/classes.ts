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
    public parentId: string;
    constructor() {

    }
}

export class Device {
    public name: string;
    public tags: Tag[];
    public internal: boolean;
    constructor() {

    }
}

export class Tag {
    public name: string;
    public id: string;
    public nodeName: string;
    public address: string;
    public type: number;
    public direction: number;
    public value: number;
    public error: boolean;
    public force: boolean;
    public unit: string;
    public addressName: string;
    public internal: boolean;
    constructor() {

    }
}

export class DeviceValue{    
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