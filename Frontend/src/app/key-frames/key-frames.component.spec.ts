import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyFramesComponent } from './key-frames.component';

describe('KeyFramesComponent', () => {
  let component: KeyFramesComponent;
  let fixture: ComponentFixture<KeyFramesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeyFramesComponent]
    });
    fixture = TestBed.createComponent(KeyFramesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
