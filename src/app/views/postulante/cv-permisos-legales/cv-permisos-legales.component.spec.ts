import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvPermisosLegalesComponent } from './cv-permisos-legales.component';

describe('CvPermisosLegalesComponent', () => {
  let component: CvPermisosLegalesComponent;
  let fixture: ComponentFixture<CvPermisosLegalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvPermisosLegalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvPermisosLegalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
