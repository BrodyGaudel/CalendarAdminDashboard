import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAclComponent } from './update-acl.component';

describe('UpdateAclComponent', () => {
  let component: UpdateAclComponent;
  let fixture: ComponentFixture<UpdateAclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAclComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
