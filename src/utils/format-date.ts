import moment from 'moment';

interface TimeData {
  format: string;
  date: string;
}

export default function fomratDate({ format, date }: TimeData): string {
  const momentDate = moment(date);
  return momentDate.format(format);
}
