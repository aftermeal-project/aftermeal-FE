import moment from 'moment';

export default function formatDate(date: string) {
  return moment(date).format('YYYY-MM-DD');
}
