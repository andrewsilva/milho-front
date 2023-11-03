import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImagemComponent } from './modal-imagem.component';

describe('ModalImagemComponent', () => {
  let component: ModalImagemComponent;
  let fixture: ComponentFixture<ModalImagemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalImagemComponent]
    });
    fixture = TestBed.createComponent(ModalImagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
