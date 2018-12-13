import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceDeleteDialogComponent } from './province-delete-dialog.component';

describe('ProvinceDeleteDialogComponent', () => {
  let component: ProvinceDeleteDialogComponent;
  let fixture: ComponentFixture<ProvinceDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinceDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
