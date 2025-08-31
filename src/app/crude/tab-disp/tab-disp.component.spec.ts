import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabDispComponent } from './tab-disp.component';

describe('TabDispComponent', () => {
  let component: TabDispComponent;
  let fixture: ComponentFixture<TabDispComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabDispComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabDispComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
