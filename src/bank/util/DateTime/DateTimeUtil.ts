import { convert, LocalDateTime, nativeJs } from '@js-joda/core';

export class DateTimeUtil {
  static toLocalDateTime(date?: Date) {
    if (!date) {
      return null;
    }
    return LocalDateTime.from(nativeJs(date));
  }

  static toDate(localDateTime?: LocalDateTime): Date | null {
    if (!localDateTime) {
      return null;
    }
    return convert(localDateTime).toDate();
  }
}
