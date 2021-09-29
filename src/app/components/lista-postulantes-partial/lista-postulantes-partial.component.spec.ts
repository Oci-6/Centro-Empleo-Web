import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPostulantesPartialComponent } from './lista-postulantes-partial.component';

describe('ListaPostulantesPartialComponent', () => {
  let component: ListaPostulantesPartialComponent;
  let fixture: ComponentFixture<ListaPostulantesPartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPostulantesPartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPostulantesPartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
