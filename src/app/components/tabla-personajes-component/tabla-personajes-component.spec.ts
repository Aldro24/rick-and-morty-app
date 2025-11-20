import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPersonajesComponent } from './tabla-personajes-component';

describe('TablaPersonajesComponent', () => {
  let component: TablaPersonajesComponent;
  let fixture: ComponentFixture<TablaPersonajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaPersonajesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaPersonajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
