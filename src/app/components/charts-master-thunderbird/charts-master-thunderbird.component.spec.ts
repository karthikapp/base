import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsMasterThunderbirdComponent } from './charts-master-thunderbird.component';

describe('ChartsMasterThunderbirdComponent', () => {
  let component: ChartsMasterThunderbirdComponent;
  let fixture: ComponentFixture<ChartsMasterThunderbirdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsMasterThunderbirdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsMasterThunderbirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
