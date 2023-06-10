import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapchatCreateModalComponent } from './capchat-create-modal.component';

describe('CapchatCreateModalComponent', () => {
  let component: CapchatCreateModalComponent;
  let fixture: ComponentFixture<CapchatCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapchatCreateModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapchatCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
