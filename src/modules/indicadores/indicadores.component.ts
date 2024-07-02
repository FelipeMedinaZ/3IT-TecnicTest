import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../app/core/services/http.service';
import { IndicadoresData } from '../../assets/interfaces/global.interface';
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
export class IndicadoresComponent implements OnInit{

  indicadores: IndicadoresData[] = [];

  constructor (
    private httpService: HttpService,
    private router: Router
  ){}

  async ngOnInit(): Promise<void> {

    // await this.getIndicators();

    
    this.indicadores = [
      {nombre: "Bitcoin", moneda: "Dólar"},
      {nombre: "Dólar Observado", moneda: "Pesos"},
    ]
    
  }

  async getIndicators(){

    try {
      const response = await this.httpService.getIndicators();
      console.log(response);
      
    } catch (error) {
      
    }
  }


  checkListado(e: Event, item: IndicadoresData) {
    e.preventDefault();
    this.router.navigate(['/listado-valores'], {queryParams: item});
  }

}
