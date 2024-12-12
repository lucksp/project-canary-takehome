export const parseTimestamp = (timestamp: string) => {
  // Split the date and time parts
  const [datePart, timePart] = timestamp.split(' ');

  // Rearrange to ISO-compatible format (YYYY-MM-DD)
  const [month, day, year] = datePart.split('/');
  const isoFormattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(
    2,
    '0'
  )}T${timePart}`;

  return new Date(isoFormattedDate);
};
