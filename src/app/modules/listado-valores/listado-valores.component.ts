import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';

//interfaces
import { ListadoValoresData } from '../../../assets/interfaces/global.interface';

//services
import { HttpService } from '../../core/services/http.service';

//modules
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CommunicationService } from '../../core/services/comunication.service';

@Component({
  selector: 'app-listado-valores',
  standalone: true,
  imports: [
    NgFor,
    NgxSpinnerModule,
    CommonModule
  ],
  templateUrl: './listado-valores.component.html',
  styleUrl: './listado-valores.component.scss'
})
export class ListadoValoresComponent implements OnInit{

  //fecha de hoy
  currentDate = new Date();
  pastDate = new Date();

  currentItem!: any; //item que llega por parametros

  //data
  listadoValores: ListadoValoresData[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private spinner: NgxSpinnerService,
    private communicationService: CommunicationService
  ){}

  ngOnInit(): void {this.getParams()};

  async getParams(){
    const queryParams = this.activatedRoute.snapshot.queryParams;
    if (queryParams) {
      //hay queryParams
      this.currentItem = queryParams;
      this.communicationService.changeMessage(this.currentItem.Nombre);
      await this.getListado();
    }
  }



  async getListado(){
    this.spinner.show();
    //fechas actuales
    const currentYear = this.currentDate.getFullYear();
    const currentMonth = this.currentDate.getMonth() + 1; // Sumar 1 porque los meses en JavaScript van de 0 a 11
    const currentDay = this.currentDate.getDate();

    //fecha pasada
    this.pastDate.setDate(this.currentDate.getDate() - 30);
    const pastYear = this.pastDate.getFullYear();
    const pastMonth = this.pastDate.getMonth() + 1; // Sumar 1 porque los meses en JavaScript van de 0 a 11
    const pastDay = this.pastDate.getDate();

    let response: any;
    try {
      if (['dolar', 'euro', 'uf'].includes(this.currentItem.Query)) {
        // Consulta por rango de fechas
        response = await this.httpService.getServiceRangoFechas(
          this.currentItem.Query,
          pastYear, pastMonth, pastDay,
          currentYear, currentMonth, currentDay
        );
      } else if (['ipc', 'utm'].includes(this.currentItem.Query)) {
        // Consulta por año actual
        response = await this.httpService.getServiceAñoActual(this.currentItem.Query, currentYear);
      }
      if (!response) { return; }
      this.listadoValores = response[this.currentItem.ResponseName];
    } finally {
      this.spinner.hide();
    }
  }
}
