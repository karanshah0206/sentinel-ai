import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawFootageComponent } from './raw-footage.component';

describe('RawFootageComponent', () => {
  let component: RawFootageComponent;
  let fixture: ComponentFixture<RawFootageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RawFootageComponent]
    });
    fixture = TestBed.createComponent(RawFootageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
