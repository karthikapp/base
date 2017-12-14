import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewnegoComponent } from './viewnego.component';

describe('ViewnegoComponent', () => {
  let component: ViewnegoComponent;
  let fixture: ComponentFixture<ViewnegoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewnegoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewnegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
