import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaselostComponent } from './caselost.component';

describe('CaselostComponent', () => {
  let component: CaselostComponent;
  let fixture: ComponentFixture<CaselostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaselostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaselostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
