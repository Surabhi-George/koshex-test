import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinedraggableComponent } from './linedraggable.component';

describe('LinedraggableComponent', () => {
  let component: LinedraggableComponent;
  let fixture: ComponentFixture<LinedraggableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinedraggableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinedraggableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
