export function generateRegistrationId(eventSlug: string): string {
  const words = eventSlug.split('-');
  let prefix = 'SN';

  if (words.length === 1) {
    prefix = words[0].substring(0, 2).toUpperCase();
  } else {
    prefix = (words[0][0] + words[1][0]).toUpperCase();
  }

  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `SN27-${prefix}-${randomNum}`;
}
