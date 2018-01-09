import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelteamregionchartsComponent } from './funnelteamregioncharts.component';

describe('FunnelteamregionchartsComponent', () => {
  let component: FunnelteamregionchartsComponent;
  let fixture: ComponentFixture<FunnelteamregionchartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelteamregionchartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelteamregionchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
