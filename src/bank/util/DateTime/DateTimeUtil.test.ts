import { DateTimeUtil } from './DateTimeUtil';
import { LocalDateTime } from '@js-joda/core';

describe('DateTimeUtil', () => {
  it('Date -> LocalDateTime', () => {
    // given
    const date = new Date('2022-08-22 13:20:22');

    // when
    const toLocalDateTime = DateTimeUtil.toLocalDateTime(date);

    // then
    expect(date.getFullYear()).toBe(toLocalDateTime.year());
    expect(date.getMonth() + 1).toBe(toLocalDateTime.monthValue());
    expect(date.getDate()).toBe(toLocalDateTime.dayOfMonth());
  });

  it('LocalDateTime -> Date', () => {
    // given
    const localDateTime = LocalDateTime.of(2016, 2, 29, 12, 55, 42, 9);

    // when
    const toDate = DateTimeUtil.toDate(localDateTime);

    // then
    expect(toDate.getFullYear()).toBe(localDateTime.year());
    expect(toDate.getMonth() + 1).toBe(localDateTime.monthValue());
    expect(toDate.getDate()).toBe(localDateTime.dayOfMonth());
  });
});
