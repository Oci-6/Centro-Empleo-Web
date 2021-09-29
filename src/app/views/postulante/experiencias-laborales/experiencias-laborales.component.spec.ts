import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciasLaboralesComponent } from './experiencias-laborales.component';

describe('ExperienciasLaboralesComponent', () => {
  let component: ExperienciasLaboralesComponent;
  let fixture: ComponentFixture<ExperienciasLaboralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienciasLaboralesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienciasLaboralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
