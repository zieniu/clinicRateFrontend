import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityDeleteDialogComponent } from './city-delete-dialog.component';

describe('CityDeleteDialogComponent', () => {
  let component: CityDeleteDialogComponent;
  let fixture: ComponentFixture<CityDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
