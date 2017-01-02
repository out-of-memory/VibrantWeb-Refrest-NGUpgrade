/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EnablelocationComponent } from './enablelocation.component';

describe('EnablelocationComponent', () => {
  let component: EnablelocationComponent;
  let fixture: ComponentFixture<EnablelocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnablelocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnablelocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
