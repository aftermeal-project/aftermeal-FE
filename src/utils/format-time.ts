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

  const formattedTime = moment(isoDate).format('A HH[시] mm[분]');

  return formattedTime.replace('AM', '오전').replace('PM', '오후');
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
