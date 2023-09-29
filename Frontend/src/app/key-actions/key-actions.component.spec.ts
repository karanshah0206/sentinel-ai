import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyActionsComponent } from './key-actions.component';

describe('KeyActionsComponent', () => {
  let component: KeyActionsComponent;
  let fixture: ComponentFixture<KeyActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeyActionsComponent]
    });
    fixture = TestBed.createComponent(KeyActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
