import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SunburstEmpComponent } from './sunburst-emp.component';

describe('SunburstEmpComponent', () => {
  let component: SunburstEmpComponent;
  let fixture: ComponentFixture<SunburstEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SunburstEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SunburstEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
