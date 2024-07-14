import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatdComponent } from './satd.component';

describe('SatdComponent', () => {
  let component: SatdComponent;
  let fixture: ComponentFixture<SatdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SatdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SatdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
