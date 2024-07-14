import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasdComponent } from './ventasd.component';

describe('VentasdComponent', () => {
  let component: VentasdComponent;
  let fixture: ComponentFixture<VentasdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
