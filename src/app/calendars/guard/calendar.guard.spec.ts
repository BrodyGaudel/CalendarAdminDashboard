import { TestBed } from '@angular/core/testing';

import { CalendarGuard } from './calendar.guard';

describe('CalendarGuard', () => {
  let guard: CalendarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CalendarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
