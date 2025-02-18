import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
  standalone: true,
})
export class PhonePipe implements PipeTransform {
  transform(value: string): string {
    if (value === undefined) {
      return '';
    }
    if (!value) return '';
    return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
}
