import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelteamchartsComponent } from './funnelteamcharts.component';

describe('FunnelteamchartsComponent', () => {
  let component: FunnelteamchartsComponent;
  let fixture: ComponentFixture<FunnelteamchartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelteamchartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelteamchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
