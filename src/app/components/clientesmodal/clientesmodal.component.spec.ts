import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesmodalComponent } from './clientesmodal.component';

describe('ClientesmodalComponent', () => {
  let component: ClientesmodalComponent;
  let fixture: ComponentFixture<ClientesmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientesmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
