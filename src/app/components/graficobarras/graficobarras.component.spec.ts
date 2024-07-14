import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficobarrasComponent } from './graficobarras.component';

describe('GraficobarrasComponent', () => {
  let component: GraficobarrasComponent;
  let fixture: ComponentFixture<GraficobarrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficobarrasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficobarrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
