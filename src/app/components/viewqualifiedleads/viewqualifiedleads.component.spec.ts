import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewqualifiedleadsComponent } from './viewqualifiedleads.component';

describe('ViewqualifiedleadsComponent', () => {
  let component: ViewqualifiedleadsComponent;
  let fixture: ComponentFixture<ViewqualifiedleadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewqualifiedleadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewqualifiedleadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
