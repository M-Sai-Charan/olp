import { Component,HostBinding  } from '@angular/core';

@Component({
  selector: 'app-olp-menu',
  templateUrl: './olp-menu.component.html',
  styleUrl: './olp-menu.component.css',
  standalone:false
})
export class OlpMenuComponent {
   isDarkMode = false;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    const body = document.body;
    if (this.isDarkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }
}
