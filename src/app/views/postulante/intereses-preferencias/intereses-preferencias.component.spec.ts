import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteresesPreferenciasComponent } from './intereses-preferencias.component';

describe('InteresesPreferenciasComponent', () => {
  let component: InteresesPreferenciasComponent;
  let fixture: ComponentFixture<InteresesPreferenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteresesPreferenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteresesPreferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
