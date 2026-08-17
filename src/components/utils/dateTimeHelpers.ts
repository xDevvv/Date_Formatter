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
): { date: string; time: string } => {

  const trimmed = dateTimeStr.trim();

  if (!trimmed) {
    return {
      date: '',
      time: ''
    };
  }

  const parts = trimmed.split(/\s+/);

  const datePart = parts[0];
  const rawTime = parts[1] ?? '';
  const meridiem = parts[2] ?? '';

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
    return {
      date: '[Invalid Date]',
      time: ''
    };
  }

  const formattedDate = formatDate(date, outputFormat);

  // Convert 1202 -> 12:02 PM
  let formattedTime = '';

  if (rawTime) {
    formattedTime = formatTime(rawTime, meridiem);
  }

  return {
    date: formattedDate,
    time: formattedTime
  };
};

const formatTime = (rawTime: string, meridiem?: string): string => {
  const clean = rawTime.trim();

  if (!clean) {
    return '';
  }

  // Remove colon so we can normalize:
  // 8:30  -> 830
  // 08:30 -> 0830
  const digits = clean.replace(':', '');

  if (!/^\d{3,4}$/.test(digits)) {
    return clean;
  }

  let hour: number;
  let minute: number;

  // 830 -> 08:30
  if (digits.length === 3) {
    hour = Number(digits.slice(0, 1));
    minute = Number(digits.slice(1));
  } else {
    // 0830 -> 08:30
    // 1230 -> 12:30
    hour = Number(digits.slice(0, 2));
    minute = Number(digits.slice(2));
  }

  // Validate minutes
  if (minute > 59) {
    return '[Invalid Time]';
  }

  // Handle AM / PM
  if (meridiem) {
    const period = meridiem.toUpperCase();

    if (period !== 'AM' && period !== 'PM') {
      return '[Invalid Time]';
    }

    // 12 AM = 00:xx
    // 12 PM = 12:xx
    if (hour < 1 || hour > 12) {
      return '[Invalid Time]';
    }

    return `${hour}:${pad(minute)} ${period}`;
  }

  // No AM/PM = 24-hour format
  if (hour > 23) {
    return '[Invalid Time]';
  }

  const dt = new Date();
  dt.setHours(hour, minute, 0, 0);

  return dt.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};