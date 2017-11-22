import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOemsComponent } from './list-oems.component';

describe('ListOemsComponent', () => {
  let component: ListOemsComponent;
  let fixture: ComponentFixture<ListOemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
