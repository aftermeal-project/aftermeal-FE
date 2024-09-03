import moment from 'moment';

interface TimeData {
  type: 'restore' | 'readable' | 'format';
  time: string;
}

function restoreToOriginalFormat(time: string): string {
  const hhmmTime = moment(time, 'HH:mm', true);

  const originalFormat = moment().set({
    hour: hhmmTime.hour(),
    minute: hhmmTime.minute(),
    second: 0,
    millisecond: 0,
  });

  return originalFormat.toISOString();
}

function formatDateToReadableFormat(time: string): string {
  const date = new Date(time);
  const isoDate = moment(date).toISOString();
  const hour = moment(isoDate).format('A');

  return `${hour === 'PM' ? '오후' : '오전'} ${moment(isoDate).format('hh[시] mm[분]')}`;
}

function formatDateToHHmm(time: string): string {
  const date = new Date(time);
  const isoDate = moment(date).format();
  return moment(isoDate).format('HH:mm');
}

export default function formatTime({ type, time }: TimeData): string {
  if (type === 'restore') {
    return restoreToOriginalFormat(time);
  } else if (type === 'readable') {
    return formatDateToReadableFormat(time);
  } else {
    return formatDateToHHmm(time);
  }
}
