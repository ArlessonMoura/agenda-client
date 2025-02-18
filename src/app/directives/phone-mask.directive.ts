import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneMask]',
})
export class PhoneMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const formattedValue = this.formatPhoneNumber(value);
    input.value = formattedValue;
  }

  private formatPhoneNumber(value: string): string {
    if (value.length > 10) {
      return value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (value.length > 6) {
      return value.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    } else if (value.length > 2) {
      return value.replace(/^(\d{2})(\d*)$/, '($1) $2');
    }
    return value;
  }
}
