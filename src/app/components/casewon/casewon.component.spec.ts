import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasewonComponent } from './casewon.component';

describe('CasewonComponent', () => {
  let component: CasewonComponent;
  let fixture: ComponentFixture<CasewonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasewonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasewonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
