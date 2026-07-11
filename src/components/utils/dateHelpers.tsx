export type InputDateFormat =
  | 'Auto Detect'
  | 'MMM-DD-YYYY'
  | 'Month-DD-YYYY'
  | 'MM/DD/YYYY'
  | 'DD/MM/YYYY'
  | 'YYYY-MM-DD';

export type OutputDateFormat =
  | 'M/D/YY'
  | 'MM/DD/YYYY'
  | 'YYYY-MM-DD'
  | 'DD-MMM-YYYY'
  | 'Month DD, YYYY';

const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const pad = (num: number) => String(num).padStart(2, '0');

const ensureTimeColon = (time: string): string => {
  const clean = time.trim();

  if (clean.includes(':') || isNaN(Number(clean))) {
    return clean;
  }

  switch (clean.length) {
    case 4:
      return `${clean.slice(0, 2)}:${clean.slice(2)}`;

    case 3:
      return `0${clean[0]}:${clean.slice(1)}`;

    default:
      return clean;
  }
};

const tryParseDate = (value: string): Date | null => {
  const timestamp = Date.parse(value);

  return isNaN(timestamp)
    ? null
    : new Date(timestamp);
};

const createDate = (
  parts: string[],
  format: InputDateFormat
): Date | null => {

  const values = parts.map(Number);

  switch (format) {
    case 'YYYY-MM-DD':
      return new Date(values[0], values[1] - 1, values[2]);

    case 'MM/DD/YYYY':
      return new Date(values[2], values[0] - 1, values[1]);

    case 'DD/MM/YYYY':
      return new Date(values[2], values[1] - 1, values[0]);

    default:
      return null;
  }
};

const formatDate = (
  date: Date,
  outputFormat: OutputDateFormat
): string => {

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  switch (outputFormat) {

    case 'M/D/YY':
      return `${month + 1}/${day}/${String(year).slice(-2)}`;

    case 'MM/DD/YYYY':
      return `${pad(month + 1)}/${pad(day)}/${year}`;

    case 'YYYY-MM-DD':
      return `${year}-${pad(month + 1)}-${pad(day)}`;

    case 'DD-MMM-YYYY':
      return `${pad(day)}-${MONTHS_SHORT[month]}-${year}`;

    case 'Month DD, YYYY':
      return `${MONTHS_LONG[month]} ${day}, ${year}`;

    default:
      return date.toLocaleDateString();
  }
};

export const parseAndFormatDate = (
  dateTimeStr: string,
  inputFormat: InputDateFormat,
  outputFormat: OutputDateFormat
): string => {

  const trimmed = dateTimeStr.trim();

  if (!trimmed) {
    return '';
  }

  const [datePart, rawTime = ''] = trimmed.split(/\s+/, 2);
  const timePart = ensureTimeColon(rawTime);

  let date: Date | null = null;

  if (inputFormat === 'Auto Detect') {

    date =
      tryParseDate(datePart) ??
      tryParseDate(datePart.replace(/-/g, ' '));

  } else {

    const parts = datePart.split(/[-/]/);

    if (parts.length === 3) {
      date = createDate(parts, inputFormat);
    }

    date ??= tryParseDate(datePart);
  }

  if (!date || isNaN(date.getTime())) {
    return `${trimmed} -> [Invalid Date]`;
  }

  const formattedDate = formatDate(date, outputFormat);

  return timePart
    ? `${formattedDate} ${timePart}`
    : formattedDate;
};