import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(date: Date | string): string {
    if (!date) return '';
    
    const now = new Date();
    const past = new Date(date);
    const diffInMilliseconds = now.getTime() - past.getTime();
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Adesso';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minuti fa`;
    } else if (diffInMinutes < 24 * 60) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} ${hours === 1 ? 'ora' : 'ore'} fa`;
    } else if (diffInMinutes < 7 * 24 * 60) {
      const days = Math.floor(diffInMinutes / (24 * 60));
      return `${days} ${days === 1 ? 'giorno' : 'giorni'} fa`;
    } else if (diffInMinutes < 30 * 24 * 60) {
      const weeks = Math.floor(diffInMinutes / (7 * 24 * 60));
      return `${weeks} ${weeks === 1 ? 'settimana' : 'settimane'} fa`;
    } else {
      return past.toLocaleDateString('it-IT');
    }
  }
}