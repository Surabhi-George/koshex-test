import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceholderEventComponent } from './placeholder-event.component';

describe('PlaceholderEventComponent', () => {
  let component: PlaceholderEventComponent;
  let fixture: ComponentFixture<PlaceholderEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceholderEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceholderEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
