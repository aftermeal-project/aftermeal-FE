import moment from 'moment';

interface TimeData {
  type: 'restore' | 'readable' | 'format';
  date: string;
}

function restoreToOriginalFormat(date: string) {
  const time = moment(date, 'HH:mm');

  const originalFormat = moment().set({
    hour: time.hour(),
    minute: time.minute(),
    second: 0,
    millisecond: 0,
  });

  return String(originalFormat);
}

function formatDateToReadableFormat(date: string) {
  const momentDate = moment(date);
  const hour = momentDate.format('A');

  return `${hour === 'PM' ? '오후' : '오전'} ${momentDate.format('hh[시] mm[분]')}`;
}

function formatDateToHHmm(date: string) {
  const momentDate = moment(date);
  return momentDate.format('hh:mm');
}

export default function formatTime({ type, date }: TimeData): string {
  if (type === 'restore') {
    return restoreToOriginalFormat(date);
  } else if (type === 'readable') {
    return formatDateToReadableFormat(date);
  } else {
    return formatDateToHHmm(date);
  }
}
