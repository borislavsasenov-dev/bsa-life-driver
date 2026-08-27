const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`;
}

const MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Takes a "YYYY-MM" key (an ISO date sliced to its first 7 chars) and renders
// it as "August 2026", for month pickers and grouped headings.
export function formatMonth(yearMonth: string) {
  const [y, m] = yearMonth.split("-");
  return `${MONTHS_LONG[Number(m) - 1]} ${y}`;
}
