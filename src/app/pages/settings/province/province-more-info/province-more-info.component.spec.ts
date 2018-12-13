import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceMoreInfoComponent } from './province-more-info.component';

describe('ProvinceMoreInfoComponent', () => {
  let component: ProvinceMoreInfoComponent;
  let fixture: ComponentFixture<ProvinceMoreInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinceMoreInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceMoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
