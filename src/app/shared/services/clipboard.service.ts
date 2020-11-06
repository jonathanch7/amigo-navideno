import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  constructor() {}

  public copiar(valor: string) {
    const i = document.createElement('input');
    i.type = 'text';
    i.style.position = 'fixed';
    i.style.left = '0';
    i.style.top = '0';
    i.style.opacity = '0';
    document.body.appendChild(i);
    i.value = valor;
    i.focus();
    i.select();
    i.value = valor;
    document.execCommand('copy');
    document.body.removeChild(i);
  }
}
