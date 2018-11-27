import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicDeleteComponent } from './clinic-delete.component';

describe('ClinicDeleteComponent', () => {
  let component: ClinicDeleteComponent;
  let fixture: ComponentFixture<ClinicDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
