import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductReservationComponent } from './edit-product-reservation.component';

describe('EditProductReservationComponent', () => {
  let component: EditProductReservationComponent;
  let fixture: ComponentFixture<EditProductReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProductReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
