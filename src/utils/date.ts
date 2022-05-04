import * as dayjs from 'dayjs';
import * as isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export const differenceByMonths = (startDate: string, endDate?: string) => {
  const rightDate = endDate
    ? dayjs(endDate)
    : dayjs(process.env.ANALYZER_START_DATE);
  const leftDate = dayjs(startDate);

  return rightDate.diff(leftDate, 'M', true);
};

export const isBetweenStartEnd = (
  startDate: string,
  endDate: string,
  date?: string,
) => {
  return dayjs(date ?? new Date()).isBetween(startDate, endDate);
};
