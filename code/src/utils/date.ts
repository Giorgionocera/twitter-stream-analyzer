import dayjs from 'dayjs';

export const differenceByYears = (startDate: string, endDate?: string) => {
  const rightDate = dayjs(endDate);
  const leftDate = dayjs(startDate);

  return leftDate.diff(rightDate, 'y', true);
};
