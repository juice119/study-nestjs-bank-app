import {
  convert,
  DateTimeFormatter,
  LocalDateTime,
  nativeJs,
  ZonedDateTime,
  ZoneId,
} from '@js-joda/core';

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

  static toString(localDateTime?: LocalDateTime): string {
    if (!localDateTime) {
      return '';
    }

    return ZonedDateTime.ofLocal(localDateTime, ZoneId.systemDefault()).format(
      DateTimeFormatter.ofPattern('yyyy-MM-dd hh:mm:ss XXX'),
    );
  }
}
