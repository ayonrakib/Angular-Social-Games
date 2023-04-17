import { describe, expect, test } from '@jest/globals';
import { DateController } from '../../app/controller/DateController';

const dateController = new DateController(new Date());

describe('add 1 day to current day:', () => {
  test('add 1 day to current day:', () => {
    var date = new Date();
    // add a day
    date.setDate(date.getDate() + 1);
    expect(
      dateController.getModifiedDateByDayDifference(1).toLocaleDateString()
    ).toBe(date.toLocaleDateString());
  });
});

describe('add 1 month to current day:', () => {
  test('add 1 month to current day:', () => {
    var date = new Date();
    // add a month
    date.setMonth(date.getMonth() + 1);
    expect(
      dateController.getModifiedDateByMonthDifference(1).toLocaleDateString()
    ).toBe(date.toLocaleDateString());
  });
});

describe('add 1 year to current day:', () => {
  test('add 1 year to current day:', () => {
    var date = new Date();
    // add a year
    date.setFullYear(date.getFullYear() + 1);
    expect(
      dateController.getModifiedDateByYearDifference(1).toLocaleDateString()
    ).toBe(date.toLocaleDateString());
  });
});
