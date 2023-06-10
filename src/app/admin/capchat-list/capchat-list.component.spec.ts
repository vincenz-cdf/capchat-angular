import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapchatListComponent } from './capchat-list.component';

describe('CapchatListComponent', () => {
  let component: CapchatListComponent;
  let fixture: ComponentFixture<CapchatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapchatListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapchatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
