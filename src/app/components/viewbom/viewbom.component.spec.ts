import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbomComponent } from './viewbom.component';

describe('ViewbomComponent', () => {
  let component: ViewbomComponent;
  let fixture: ComponentFixture<ViewbomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewbomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewbomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
