import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//modules
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ChartModule } from 'primeng/chart';

//services
import { HttpService } from '../../core/services/http.service';
import { CommunicationService } from '../../core/services/comunication.service';

//interfaces
import { ListadoValoresData } from '../../../assets/interfaces/global.interface';
import { ChartDataService } from '../../core/services/chart.service';


@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [
    NgFor,
    NgxSpinnerModule,
    CommonModule,
    ChartModule
  ],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.scss'
})
export class DetalleComponent implements OnInit{
  //fechas
  currentDate = new Date();
  pastDate = new Date()

  currentItem!: any; //item que llega por parametros
  item!: ListadoValoresData; //variable para mostrar html
  chartData: any; //chart

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private spinner: NgxSpinnerService,
    private communicationService: CommunicationService,
    public chartService: ChartDataService
  ){}

  ngOnInit(): void {this.getParams()};

  async getParams(){
    const queryParams = this.activatedRoute.snapshot.queryParams;
    if (queryParams) {
      //hay queryParams
      this.currentItem = queryParams;
      this.communicationService.changeMessage(this.currentItem.Nombre);
      await this.getInfo();
    }
  }


  async getInfo(){
    this.spinner.show();
    // PRIMERO CONSUMIMOS EL SERVICIO QUE TRAE EL VALOR MAS ACTUAL.
    const resp = await this.getCurrentInfo();
    if (!resp) { return;}

    //LUEGO EVALUAMOS QUE DIVIZA LLEGA, PARA ASI SABER QUE SERVICIO DEBEMOS CONSUMIR.

    // Obtener la fecha actual y la fecha hace 10 días
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 9);

    // Determinar parametros segun tipo de consulta
    let response;
    if (['dolar', 'euro', 'uf'].includes(this.currentItem.Query)) {
      // Consultar últimos 10 días
      response = await this.httpService.getServiceRangoFechas(
        this.currentItem.Query,
        pastDate.getFullYear(),
        pastDate.getMonth() + 1, // Sumar 1 porque los meses van de 0 a 11
        pastDate.getDate(),
        currentDate.getFullYear(),
        currentDate.getMonth() + 1, // Sumar 1 porque los meses van de 0 a 11
        currentDate.getDate()
      );
    } else if (['ipc', 'utm'].includes(this.currentItem.Query)) {
      // consultar ultimos 12 meses
      response = await this.httpService.getRangoFechasUfIpc(
        this.currentItem.Query,
        this.currentDate.getFullYear() -1,
        this.currentDate.getMonth(),
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
      );
    }
    if (!response) { return;}

    const measurements = this.chartService.transformData(response[this.currentItem.ResponseName], this.currentItem.ResponseName, this.currentItem.Nombre);
    this.chartData = measurements;
    this.spinner.hide();
  }

  async getCurrentInfo(){
    try {
      const response = await this.httpService.getService(this.currentItem.Query);
      if (!response) { return;}
      this.item = response[this.currentItem.ResponseName][0];
      return true;
    } catch (error) { return false; }
  }
}
