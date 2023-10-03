import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalDataComponent } from './historical-data.component';

describe('HistoricalDataComponent', () => {
  let component: HistoricalDataComponent;
  let fixture: ComponentFixture<HistoricalDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricalDataComponent]
    });
    fixture = TestBed.createComponent(HistoricalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
