import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityMoreInfoComponent } from './city-more-info.component';

describe('CityMoreInfoComponent', () => {
  let component: CityMoreInfoComponent;
  let fixture: ComponentFixture<CityMoreInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityMoreInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityMoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
