/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModbusService } from './modbus.service';

describe('ModbusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModbusService]
    });
  });

  it('should ...', inject([ModbusService], (service: ModbusService) => {
    expect(service).toBeTruthy();
  }));
});
