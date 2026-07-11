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


function createDate(parts: string[], format: InputDateFormat): Date | null {
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
}

function tryParseDate(value: string): Date | null {
  const timestamp = Date.parse(value);

  return isNaN(timestamp) ? null : new Date(timestamp);
}

export const parseAndFormatDate = (
  dateTimeStr: string,
  inputFormat: InputDateFormat,
  outputFormat: OutputDateFormat
): string => {

  const trimmed = dateTimeStr.trim();

  if (!trimmed) return '';

  // Separate date and time
  const spaceIndex = trimmed.indexOf(' ');
  let datePart = trimmed;
  let timePart = '';

  if (spaceIndex !== -1) {
    datePart = trimmed.substring(0, spaceIndex).trim();
    timePart = trimmed.substring(spaceIndex + 1).trim();
  }

  let date: Date | null = null;

  if (inputFormat === 'Auto Detect') {
    date =
      tryParseDate(datePart) ??
      tryParseDate(datePart.replace(/-/g, ' '));
  } else {
    const parts = datePart.split(/[-/]/);

    if (parts.length === 3)  date = createDate(parts, inputFormat);
    
    if (!date || isNaN(date.getTime())) date = tryParseDate(datePart);
  }

  if (!date || isNaN(date.getTime())) {
    return `${trimmed} -> [Invalid Date]`;
  }

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  let formattedDate = '';

  switch (outputFormat) {
    case 'M/D/YY':
      formattedDate = `${month + 1}/${day}/${String(year).slice(-2)}`;
      break;

    case 'MM/DD/YYYY':
      formattedDate = `${pad(month + 1)}/${pad(day)}/${year}`;
      break;

    case 'YYYY-MM-DD':
      formattedDate = `${year}-${pad(month + 1)}-${pad(day)}`;
      break;

    case 'DD-MMM-YYYY':
      formattedDate = `${pad(day)}-${MONTHS_SHORT[month]}-${year}`;
      break;

    case 'Month DD, YYYY':
      formattedDate = `${MONTHS_LONG[month]} ${day}, ${year}`;
      break;

    default:
      formattedDate = date.toLocaleDateString();
  }

  // Re-attach the original time if present
  return timePart ? `${formattedDate} ${timePart}` : formattedDate;
};