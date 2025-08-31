import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TolbarComponent } from './tolbar.component';

describe('TolbarComponent', () => {
  let component: TolbarComponent;
  let fixture: ComponentFixture<TolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
