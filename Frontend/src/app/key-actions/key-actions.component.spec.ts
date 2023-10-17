import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KeyActionsComponent } from './key-actions.component';

fdescribe('KeyActionsComponent', () => {
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

  it('should fetch data from api', () => {
    spyOn(component, 'fetchData');

    component.ngOnInit();

    expect(component.fetchData).toHaveBeenCalled();
  })
});
