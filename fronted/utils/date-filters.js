import { sub, format } from 'date-fns';

const today = new Date();
const todayFormat = format(today, 'yyyy/MM/dd');

const dateFilters = [
  {
    label: 'Últimos 7 días',
    startAt: format(sub(today, { days: 7 }), 'yyyy/MM/dd'),
    endAt: todayFormat,
  },
  {
    label: 'Últimos 30 días',
    startAt: format(sub(today, { days: 30 }), 'yyyy/MM/dd'),
    endAt: todayFormat,
  },
  {
    label: 'Últimos 90 días',
    startAt: format(sub(today, { days: 90 }), 'yyyy/MM/dd'),
    endAt: todayFormat,
  },
  {
    label: 'Último año',
    startAt: format(sub(today, { years: 1 }), 'yyyy/MM/dd'),
    endAt: todayFormat,
  },
];

export default dateFilters;
