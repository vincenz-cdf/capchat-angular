import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapchatComponent } from './capchat.component';

describe('CapchatComponent', () => {
  let component: CapchatComponent;
  let fixture: ComponentFixture<CapchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapchatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
