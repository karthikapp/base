import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsMasterClassicComponent } from './charts-master-classic.component';

describe('ChartsMasterClassicComponent', () => {
  let component: ChartsMasterClassicComponent;
  let fixture: ComponentFixture<ChartsMasterClassicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsMasterClassicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsMasterClassicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
