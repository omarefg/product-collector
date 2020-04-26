import { sub, format, getYear, getMonth } from 'date-fns';

const today = new Date();
const todayFormat = format(today, 'yyyy-MM-dd');

const dateFilters = [
  {
    label: 'Últimos 7 días',
    startAt: format(sub(today, { days: 7 }), 'yyyy-MM-dd'),
    endAt: todayFormat,
  },
  {
    label: 'Últimos 15 días',
    startAt: format(sub(today, { days: 15 }), 'yyyy-MM-dd'),
    endAt: todayFormat,
  },
  {
    label: 'Mes actual',
    startAt: format(new Date(getYear(today), getMonth(today), 1), 'yyyy-MM-dd'),
    endAt: todayFormat,
  },
  {
    label: 'Últimos 30 días',
    startAt: format(sub(today, { days: 30 }), 'yyyy-MM-dd'),
    endAt: todayFormat,
  },
  {
    label: 'Últimos 90 días',
    startAt: format(sub(today, { days: 90 }), 'yyyy-MM-dd'),
    endAt: todayFormat,
  },
  {
    label: 'Año actual',
    startAt: format(new Date(getYear(today), 1, 1), 'yyyy-MM-dd'),
    endAt: todayFormat,
  },
  {
    label: 'Último año',
    startAt: format(sub(today, { years: 1 }), 'yyyy-MM-dd'),
    endAt: todayFormat,
  },
  {
    label: 'Últimos dos años',
    startAt: format(sub(today, { years: 2 }), 'yyyy-MM-dd'),
    endAt: todayFormat,
  },
];

export default dateFilters;
