import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficopieComponent } from './graficopie.component';

describe('GraficopieComponent', () => {
  let component: GraficopieComponent;
  let fixture: ComponentFixture<GraficopieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficopieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficopieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
