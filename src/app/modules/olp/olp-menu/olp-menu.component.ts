import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-olp-menu',
  templateUrl: './olp-menu.component.html',
  styleUrl: './olp-menu.component.css',
  standalone: false
})
export class OlpMenuComponent {
  isDarkMode = false;

  constructor(private router: Router) { }
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    const body = document.body;
    if (this.isDarkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }
  employeeName = 'Alex Smith';
  employeeAvatarUrl = 'https://primefaces.org/cdn/primeng/images/demo/avatar/walter.jpg'; // or fetch from backend
  profileDropdownOpen = false;

  toggleProfileDropdown() {
    this.profileDropdownOpen = !this.profileDropdownOpen;
  }

  logout() {
    this.router.navigateByUrl('/login')
  }

}
