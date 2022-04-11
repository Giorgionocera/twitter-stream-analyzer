import * as dayjs from 'dayjs';

export const differenceByMonths = (startDate: string, endDate?: string) => {
  const rightDate = endDate ? dayjs(endDate) : dayjs();
  const leftDate = dayjs(startDate);

  return rightDate.diff(leftDate, 'M', true);
};
