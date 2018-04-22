import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetdashytdComponent } from './targetdashytd.component';

describe('TargetdashytdComponent', () => {
  let component: TargetdashytdComponent;
  let fixture: ComponentFixture<TargetdashytdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetdashytdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetdashytdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
