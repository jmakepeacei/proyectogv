import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RventasComponent } from './rventas.component';

describe('RventasComponent', () => {
  let component: RventasComponent;
  let fixture: ComponentFixture<RventasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RventasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RventasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
