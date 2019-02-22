import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftCardComponent } from './left-card.component';

describe('LeftCardComponent', () => {
  let component: LeftCardComponent;
  let fixture: ComponentFixture<LeftCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
