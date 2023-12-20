import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingStaticComponent } from './rating-static.component';

describe('RatingStaticComponent', () => {
  let component: RatingStaticComponent;
  let fixture: ComponentFixture<RatingStaticComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RatingStaticComponent]
    });
    fixture = TestBed.createComponent(RatingStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
