import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarOfertaComponent } from './modificar-oferta.component';

describe('ModificarOfertaComponent', () => {
  let component: ModificarOfertaComponent;
  let fixture: ComponentFixture<ModificarOfertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarOfertaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
