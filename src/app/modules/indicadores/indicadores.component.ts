import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
import { IndicadoresData } from '../../../assets/interfaces/global.interface';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indicadores',
  standalone: true,
  imports: [
    NgFor,
  ],
  templateUrl: './indicadores.component.html',
  styleUrl: './indicadores.component.scss'
})
export class IndicadoresComponent{

  indicadores: IndicadoresData[] = [
    {Nombre: "Dólar", Moneda: "Pesos", Query: "dolar", ResponseName: "Dolares"},
    {Nombre: "Euro", Moneda: "Pesos", Query: "euro", ResponseName: "Euros"},
    {Nombre: "IPC", Moneda: "Pesos", Query: "ipc", ResponseName: "IPCs"},
    {Nombre: "UF", Moneda: "Pesos", Query: "uf", ResponseName: "UFs"},
    {Nombre: "UTM", Moneda: "Pesos", Query: "utm", ResponseName: "UTMs"},
  ];

  constructor (
    private httpService: HttpService,
    private router: Router
  ){}


  checkListado(e: Event, item: IndicadoresData) {
    e.preventDefault();
    this.router.navigate(['/listado-valores'], {queryParams: item});
  }

  checkDetalle(e: Event, item: IndicadoresData) {
    e.preventDefault();
    this.router.navigate(['/detalle'], {queryParams: item});
  }
}
