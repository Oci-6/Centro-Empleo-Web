import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducacionFormacionComponent } from './educacion-formacion.component';

describe('EducacionFormacionComponent', () => {
  let component: EducacionFormacionComponent;
  let fixture: ComponentFixture<EducacionFormacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducacionFormacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducacionFormacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
