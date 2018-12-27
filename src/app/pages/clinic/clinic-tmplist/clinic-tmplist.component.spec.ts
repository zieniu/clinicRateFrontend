import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicTMPListComponent } from './clinic-tmplist.component';

describe('ClinicTMPListComponent', () => {
  let component: ClinicTMPListComponent;
  let fixture: ComponentFixture<ClinicTMPListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicTMPListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicTMPListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
