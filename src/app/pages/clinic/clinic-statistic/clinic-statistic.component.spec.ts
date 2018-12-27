import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicStatisticComponent } from './clinic-statistic.component';

describe('ClinicStatisticComponent', () => {
  let component: ClinicStatisticComponent;
  let fixture: ComponentFixture<ClinicStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
