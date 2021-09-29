import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosLicenciasComponent } from './permisos-licencias.component';

describe('PermisosLicenciasComponent', () => {
  let component: PermisosLicenciasComponent;
  let fixture: ComponentFixture<PermisosLicenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermisosLicenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosLicenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
