export const BUSINESS_TIME_ZONE = 'America/Argentina/Buenos_Aires';

export const BUSINESS_HOURS = [
  { day: 'Lunes', dayIndex: 1, shifts: [] },
  {
    day: 'Martes',
    dayIndex: 2,
    shifts: [
      { from: '11:30', to: '14:00' },
      { from: '20:00', to: '23:00' },
    ],
  },
  {
    day: 'Miércoles',
    dayIndex: 3,
    shifts: [
      { from: '11:30', to: '14:00' },
      { from: '20:00', to: '23:00' },
    ],
  },
  {
    day: 'Jueves',
    dayIndex: 4,
    shifts: [
      { from: '11:30', to: '14:00' },
      { from: '20:00', to: '23:00' },
    ],
  },
  {
    day: 'Viernes',
    dayIndex: 5,
    shifts: [
      { from: '11:30', to: '14:00' },
      { from: '20:00', to: '23:00' },
    ],
  },
  {
    day: 'Sábado',
    dayIndex: 6,
    shifts: [
      { from: '11:30', to: '14:00' },
      { from: '20:00', to: '23:00' },
    ],
  },
  {
    day: 'Domingo',
    dayIndex: 0,
    shifts: [{ from: '20:00', to: '23:00' }],
  },
];

export const getDisplayHours = () => BUSINESS_HOURS.map(({ day, shifts }) => ({
  day,
  turnos: shifts.length
    ? shifts.map(({ from, to }) => ({ label: `${from} a ${to} hs`, type: 'open' }))
    : [{ label: 'Cerrado', type: 'closed' }],
}));

export const isBusinessOpen = (date = new Date()) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: BUSINESS_TIME_ZONE,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  const weekdayIndexes = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const scheduleForDay = BUSINESS_HOURS.find(({ dayIndex }) => dayIndex === weekdayIndexes[values.weekday]);
  const currentMinutes = Number(values.hour) * 60 + Number(values.minute);

  return scheduleForDay?.shifts.some(({ from, to }) => {
    const [fromHour, fromMinute] = from.split(':').map(Number);
    const [toHour, toMinute] = to.split(':').map(Number);
    return currentMinutes >= fromHour * 60 + fromMinute && currentMinutes < toHour * 60 + toMinute;
  }) ?? false;
};

export const getScheduleSummary = () => BUSINESS_HOURS
  .map(({ day, shifts }) => {
    if (!shifts.length) return `los ${day.toLowerCase()} permanecemos cerrados`;

    const shiftsText = shifts
      .map(({ from, to }) => `${from} a ${to} hs`)
      .join(' y ');
    return `${day} de ${shiftsText}`;
  })
  .join('. ')
  .replace(/^./, (character) => character.toLowerCase()) + '.';