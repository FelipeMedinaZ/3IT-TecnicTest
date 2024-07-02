import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';

//interfaces
import { ListadoValoresData } from '../../../assets/interfaces/global.interface';
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
  pastDate = new Date()

  currentItem!: any; //item que llega por parametros

  listadoValores: ListadoValoresData[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private spinner: NgxSpinnerService,
    private communicationService: CommunicationService
  ){}

  ngOnInit(): void {
    this.getParams()
  }


  async getParams(){
    const queryParams = this.activatedRoute.snapshot.queryParams;

    if (queryParams) {
      //hay queryParams
      console.log("A VER: ", queryParams);
      this.currentItem = queryParams;
      this.communicationService.changeMessage(this.currentItem.Nombre);

      await this.getListado();
    }

  }



  async getListado(){
    this.spinner.show();

    console.log("fecha de hoy: ", this.currentDate);


    //CREAMOS CONSTANTES PARA FACILITAR EL CONSUMO DEL SERVICIO getServiceRangoFechas
    // FECHA ACTUAL
    const currentYear = this.currentDate.getFullYear();
    const currentMonth = this.currentDate.getMonth() + 1; // se suma 1 porque los meses en js se trabajan de 0 a 11.
    const currentDay = this.currentDate.getDate();

    //FECHA 30 DIAS ATRAS
    this.pastDate.setDate(this.currentDate.getDate() - 30);
    const pastYear = this.pastDate.getFullYear();
    const pastMonth = this.pastDate.getMonth() + 1; // se suma 1 porque los meses en js se trabajan de 0 a 11.
    const pastDay = this.pastDate.getDate();

    let response: any;
    try {
      if (this.currentItem.Query === 'dolar' || this.currentItem.Query === 'euro' || this.currentItem.Query === 'uf') {
        //BUSCAMOS POR FECHA
        response = await this.httpService.getServiceRangoFechas(this.currentItem.Query, pastYear, pastMonth, pastDay, currentYear, currentMonth, currentDay);

      }

      if (this.currentItem.Query !== 'ipc' || this.currentItem.Query !== 'utm') {
        // BUSCAMOS EL AÑO ACTUAL
        response = await this.httpService.getServiceAñoActual(this.currentItem.Query, currentYear);
      }


      this.listadoValores = response[this.currentItem.ResponseName];


      this.spinner.hide();

    } catch (error) {
      this.spinner.hide();
      console.error("Error");
    }


  }

}
