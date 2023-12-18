import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductsOrderDialogComponent } from './show-products-order-dialog.component';

describe('ShowProductsOrderDialogComponent', () => {
  let component: ShowProductsOrderDialogComponent;
  let fixture: ComponentFixture<ShowProductsOrderDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowProductsOrderDialogComponent]
    });
    fixture = TestBed.createComponent(ShowProductsOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
