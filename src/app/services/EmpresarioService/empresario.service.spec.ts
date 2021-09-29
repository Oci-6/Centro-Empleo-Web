import { TestBed } from '@angular/core/testing';

import { EmpresarioService } from './empresario.service';

describe('EmpresarioService', () => {
  let service: EmpresarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
