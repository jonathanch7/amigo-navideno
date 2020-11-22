import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  constructor() {}

  public copiar(valor: string, el?: HTMLElement): void {
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
    if (el) {
      const contenido = el.textContent;
      el.textContent = 'thumb_up_alt';
      setTimeout(() => (el.textContent = contenido), 200);
    }
  }
}
