import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpresalesComponent } from './viewpresales.component';

describe('ViewpresalesComponent', () => {
  let component: ViewpresalesComponent;
  let fixture: ComponentFixture<ViewpresalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewpresalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpresalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
