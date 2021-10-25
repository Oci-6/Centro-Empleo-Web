import { TestBed } from '@angular/core/testing';

import { PerfilCompletoGuard } from './perfil-completo.guard';

describe('PerfilCompletoGuard', () => {
  let guard: PerfilCompletoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PerfilCompletoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
