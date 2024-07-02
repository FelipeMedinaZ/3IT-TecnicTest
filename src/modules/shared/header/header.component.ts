import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{

  currentRoute: string = "";
  text: string = "";

  constructor(private router: Router){}

  ngOnInit(): void {
    this.currentRoute = this.router.url;

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects; // se utiliza after redirects para abarcar el caso en el cual el usuario escriba una url cualquiera
      console.log("currentRoute: ", this.currentRoute);
      
    });
  }
}
