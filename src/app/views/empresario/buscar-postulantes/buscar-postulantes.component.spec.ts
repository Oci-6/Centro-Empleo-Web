import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPostulantesComponent } from './buscar-postulantes.component';

describe('BuscarPostulantesComponent', () => {
  let component: BuscarPostulantesComponent;
  let fixture: ComponentFixture<BuscarPostulantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarPostulantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarPostulantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
