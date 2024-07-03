import { NgIf } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import {filter} from 'rxjs/operators';

//services
import { CommunicationService } from '../../../core/services/comunication.service';

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

  currencyName: string = "";


  constructor(
    private router: Router,
    private communicationService: CommunicationService

  ){
    this.communicationService.currentMessage.subscribe(message => {
      this.currencyName = message
    })
  }

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects; // se utiliza after redirects para abarcar el caso en el cual el usuario escriba una url cualquiera
      console.log("currentRoute: ", this.currentRoute);

    });
  }

  back(e: Event){
    e.preventDefault();
    this.router.navigate(['/indicadores'])
  }
}
