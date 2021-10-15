import { TestBed } from '@angular/core/testing';

import { EmpresaActivaGuard } from './empresa-activa.guard';

describe('EmpresaActivaGuard', () => {
  let guard: EmpresaActivaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmpresaActivaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
