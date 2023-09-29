import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessedFootageComponent } from './processed-footage.component';

describe('ProcessedFootageComponent', () => {
  let component: ProcessedFootageComponent;
  let fixture: ComponentFixture<ProcessedFootageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessedFootageComponent]
    });
    fixture = TestBed.createComponent(ProcessedFootageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
