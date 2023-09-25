import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModeService {
  constructor() {}
  isDarkMode(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
