export function getTotalPay(start, end, basicWage, eventWage) {
  if (!start || !end) return 0;

  const startTime = new Date(start);
  const endTime = new Date(end);

  let cur = new Date(startTime);
  let totalPay = 0;

  while (cur < endTime) {
    const next = new Date(cur);
    next.setMinutes(cur.getMinutes() + 1);

    const hour = cur.getHours();
    const isNight = hour >= 22;

    const wagePerMinute = (isNight ? eventWage : basicWage) / 60;
    totalPay += wagePerMinute;

    cur = next;
  }

  return Math.round(totalPay);
}
