import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEnterpriseComponent } from './register-enterprise.component';

describe('RegisterEnterpriseComponent', () => {
  let component: RegisterEnterpriseComponent;
  let fixture: ComponentFixture<RegisterEnterpriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterEnterpriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
