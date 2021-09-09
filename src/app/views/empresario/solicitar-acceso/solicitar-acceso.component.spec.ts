import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarAccesoComponent } from './solicitar-acceso.component';

describe('SolicitarAccesoComponent', () => {
  let component: SolicitarAccesoComponent;
  let fixture: ComponentFixture<SolicitarAccesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitarAccesoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
