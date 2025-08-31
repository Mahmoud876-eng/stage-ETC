import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabdispComponent } from './tabdisp.component';

describe('TabdispComponent', () => {
  let component: TabdispComponent;
  let fixture: ComponentFixture<TabdispComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabdispComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabdispComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
