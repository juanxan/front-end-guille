import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosReadComponent } from './pedidos-read.component';

describe('PedidosReadComponent', () => {
  let component: PedidosReadComponent;
  let fixture: ComponentFixture<PedidosReadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PedidosReadComponent]
    });
    fixture = TestBed.createComponent(PedidosReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
