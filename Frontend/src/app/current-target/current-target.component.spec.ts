import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CurrentTargetComponent } from './current-target.component';

fdescribe('CurrentTargetComponent', () => {
  let component: CurrentTargetComponent;
  let fixture: ComponentFixture<CurrentTargetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentTargetComponent]
    });
    fixture = TestBed.createComponent(CurrentTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should call onClick when button is clicked', waitForAsync(() => {
    spyOn(component, 'onClick');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(component.onClick).toHaveBeenCalled();
  }))

  
});
