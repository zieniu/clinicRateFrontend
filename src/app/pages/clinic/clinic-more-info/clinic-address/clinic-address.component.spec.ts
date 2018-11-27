import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicAddressComponent } from './clinic-address.component';

describe('ClinicAddressComponent', () => {
  let component: ClinicAddressComponent;
  let fixture: ComponentFixture<ClinicAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
