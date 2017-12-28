import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllopportunitiesComponent } from './allopportunities.component';

describe('AllopportunitiesComponent', () => {
  let component: AllopportunitiesComponent;
  let fixture: ComponentFixture<AllopportunitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllopportunitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllopportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
