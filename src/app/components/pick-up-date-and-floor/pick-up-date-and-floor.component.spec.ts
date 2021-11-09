import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickUpDateAndFloorComponent } from './pick-up-date-and-floor.component';

describe('PickUpDateAndFloorComponent', () => {
  let component: PickUpDateAndFloorComponent;
  let fixture: ComponentFixture<PickUpDateAndFloorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickUpDateAndFloorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickUpDateAndFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
