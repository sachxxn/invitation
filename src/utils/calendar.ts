import type { EventItem } from '../types/wedding';


export function createGoogleCalendarUrl(event: EventItem, venueName: string): string {
  const title = encodeURIComponent(`Wedding: ${event.title} (Kaaviya & Thyaneshwar)`);
  const details = encodeURIComponent(`${event.description}\n\nVenue: ${event.venue}, ${event.address}`);
  const location = encodeURIComponent(`${venueName}, ${event.address}`);
  const dates = `${event.calendarStartDate}/${event.calendarEndDate}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

export function downloadIcsFile(event: EventItem, venueName: string): void {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Kaaviya & Thyaneshwar Royal Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:Wedding: ${event.title} - Kaaviya & Thyaneshwar`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${venueName}\\, ${event.address}`,
    `DTSTART:${event.calendarStartDate}`,
    `DTEND:${event.calendarEndDate}`,
    `STATUS:CONFIRMED`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${event.id}-wedding-invitation.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
