import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawFootageComponent } from './raw-footage.component';

fdescribe('RawFootageComponent', () => {
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

  it('should recieve video feed from url', () => {
    spyOn(component, 'getVideoFeed');

    component.ngOnInit()

    expect(component.getVideoFeed).toHaveBeenCalled();
  });
});
