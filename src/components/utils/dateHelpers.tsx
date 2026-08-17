import {
  parseAndFormatDate,
} from './dateTimeHelpers';

import type {
  InputDateFormat,
  OutputDateFormat,
} from './dateTimeHelpers';

export const parseAndFormatDateTime = (
  dateTimeStr: string,
  inputFormat: InputDateFormat,
  outputFormat: OutputDateFormat
): string => {
  const result = parseAndFormatDate(
    dateTimeStr,
    inputFormat,
    outputFormat
  );

  if (result.date === '[Invalid Date]') {
    return '[Invalid Date]';
  }

  if (!result.time) {
    return result.date;
  }

  if (result.time === '[Invalid Time]') {
    return `${result.date} [Invalid Time]`;
  }

  return `${result.date} ${result.time}`;
};