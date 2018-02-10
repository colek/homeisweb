import { TestBed, inject } from '@angular/core/testing';

import { ModbusService } from './modbus.service';

describe('ModbusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModbusService]
    });
  });

  it('should be created', inject([ModbusService], (service: ModbusService) => {
    expect(service).toBeTruthy();
  }));
});
