import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'password-manager';
  showNavbar: boolean = false;

  constructor(private router: Router) {
    // Subscribe to route changes to update the display condition
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Update the display condition based on the current route
      this.updateDisplayCondition();
    });
  }

  private updateDisplayCondition(): void {
    // Add logic here to update the display condition based on the current route
    // For example, you can check if the current route is one of your custom routes
    this.showNavbar = this.isCustomRoute(this.router.url);
  }

  private isCustomRoute(url: string): boolean {
    // Add logic to check if the current route is one of your custom routes
    // For example, you can check if the URL contains a specific path
    return url.includes('/site-list') || url.includes('/password-list');
  }
}
