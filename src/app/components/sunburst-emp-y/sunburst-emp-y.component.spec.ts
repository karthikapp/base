import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SunburstEmpYComponent } from './sunburst-emp-y.component';

describe('SunburstEmpYComponent', () => {
  let component: SunburstEmpYComponent;
  let fixture: ComponentFixture<SunburstEmpYComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SunburstEmpYComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SunburstEmpYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
